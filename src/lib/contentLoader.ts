/**
 * Loads the brokerage content from GitHub at runtime, falling back to the
 * bundled copy in /content if GitHub is unreachable or rate-limited.
 *
 * Strategy:
 *   1. Fetch the full repo tree in a single GitHub API call.
 *   2. For each .txt file in a folder we care about, fetch the raw content
 *      from the raw.githubusercontent.com CDN (no API rate limit).
 *   3. Cache the result in sessionStorage with a TTL so we don't re-hit
 *      GitHub on every page navigation.
 *   4. If anything fails, fall back to the bundled copy.
 */

import { parseContent, type ParsedDoc } from './contentParser'

// ---------- Configuration ----------

/**
 * Content repository on GitHub. The website fetches `.txt` files from this
 * repo at runtime. The `BRANCH` is whichever branch the broker is editing
 * via the GitHub web UI.
 */
export const CONTENT_REPO: {
  owner: string
  name: string
  branch: string
  /**
   * Set to a subfolder if you'd rather keep the content under e.g. `content/`
   * inside the repo. Set to '' to use the repo root.
   */
  basePath: string
} = {
  owner: 'thebmw37',
  name: 'FlatironsBrokerage',
  branch: 'main',
  basePath: '',
}

/** How long to trust a cached response before re-fetching from GitHub. */
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes
const CACHE_KEY = 'fb_content_cache_v1'

// ---------- Bundled fallback ----------

// Vite bundles all .txt files under /content as raw strings. This lets the
// site render correctly even with no network access and gives us a guaranteed
// fallback when GitHub is unreachable or rate-limited.
const bundledRaw = import.meta.glob('/content/**/*.txt', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** Map of "Folder/file.txt" → raw text from the bundled copy. */
const bundled: Record<string, string> = {}
for (const [path, raw] of Object.entries(bundledRaw)) {
  // path looks like '/content/Brokers/joni.txt'
  const relative = path.replace(/^\/content\//, '')
  bundled[relative] = raw
}

// ---------- Public types ----------

export type FolderName =
  | 'Brokers'
  | 'Blog'
  | 'Listings/Active'
  | 'Listings/UnderContract'
  | 'Listings/Sold'
  | 'Testimonials'
  | 'Featured Property'

export type LoadedFile = {
  /** "Folder/filename.txt" relative path (URL-encoded segments where needed). */
  path: string
  /** File name without extension, useful as a stable id. */
  slug: string
  /** Parsed document. */
  doc: ParsedDoc
}

// ---------- Session cache ----------

type CacheShape = {
  expiresAt: number
  files: Record<string, string> // path → raw text
}

function readCache(): CacheShape | null {
  if (typeof sessionStorage === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CacheShape
    if (!parsed.expiresAt || parsed.expiresAt < Date.now()) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(files: Record<string, string>): void {
  if (typeof sessionStorage === 'undefined') return
  try {
    const cache: CacheShape = {
      expiresAt: Date.now() + CACHE_TTL_MS,
      files,
    }
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    // sessionStorage can throw in private mode / when quota is exceeded;
    // we just skip caching in that case.
  }
}

// ---------- GitHub fetch ----------

type TreeEntry = { path: string; type: string }

async function fetchTree(): Promise<TreeEntry[] | null> {
  const url = `https://api.github.com/repos/${CONTENT_REPO.owner}/${CONTENT_REPO.name}/git/trees/${CONTENT_REPO.branch}?recursive=1`
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null
    const json = (await res.json()) as { tree?: TreeEntry[] }
    return json.tree ?? null
  } catch {
    return null
  }
}

function rawUrl(path: string): string {
  const prefix = CONTENT_REPO.basePath
    ? `${CONTENT_REPO.basePath.replace(/^\/|\/$/g, '')}/`
    : ''
  // Encode each path segment so spaces (e.g. "Featured Property") survive.
  const encoded = path
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/')
  return `https://raw.githubusercontent.com/${CONTENT_REPO.owner}/${CONTENT_REPO.name}/${CONTENT_REPO.branch}/${prefix}${encoded}`
}

async function fetchRawFiles(
  paths: string[],
): Promise<Record<string, string> | null> {
  try {
    const entries = await Promise.all(
      paths.map(async (path) => {
        const res = await fetch(rawUrl(path))
        if (!res.ok) throw new Error(`Failed to fetch ${path}`)
        const text = await res.text()
        return [path, text] as const
      }),
    )
    return Object.fromEntries(entries)
  } catch {
    return null
  }
}

// ---------- Main load ----------

const FOLDERS: FolderName[] = [
  'Brokers',
  'Blog',
  'Listings/Active',
  'Listings/UnderContract',
  'Listings/Sold',
  'Testimonials',
  'Featured Property',
]

function isInRelevantFolder(path: string): boolean {
  if (!path.toLowerCase().endsWith('.txt')) return false
  return FOLDERS.some((f) => path === f || path.startsWith(`${f}/`))
}

function trimBasePath(path: string): string {
  const base = CONTENT_REPO.basePath.replace(/^\/|\/$/g, '')
  if (!base) return path
  if (path === base) return ''
  if (path.startsWith(`${base}/`)) return path.slice(base.length + 1)
  return path
}

/**
 * The one place that actually fetches. Returns a map of
 * "Folder/file.txt" → raw text, merged: GitHub wins, bundled fills gaps.
 */
let inFlight: Promise<Record<string, string>> | null = null

async function loadAllRaw(): Promise<Record<string, string>> {
  if (inFlight) return inFlight
  inFlight = (async () => {
    const cached = readCache()
    if (cached) {
      // Merge with bundled so newly-added local files (during dev) still appear.
      return { ...bundled, ...cached.files }
    }

    const tree = await fetchTree()
    if (!tree) return bundled

    const candidatePaths = tree
      .filter((e) => e.type === 'blob')
      .map((e) => trimBasePath(e.path))
      .filter(isInRelevantFolder)

    if (candidatePaths.length === 0) return bundled

    const fetched = await fetchRawFiles(candidatePaths)
    if (!fetched) return bundled

    writeCache(fetched)
    // Merge so bundled extras still show; GitHub values win on conflict.
    return { ...bundled, ...fetched }
  })()

  try {
    return await inFlight
  } finally {
    // Reset so a future call (after cache expires) re-fetches.
    setTimeout(() => {
      inFlight = null
    }, 0)
  }
}

// ---------- Public API ----------

function slugFromPath(path: string): string {
  const name = path.split('/').pop() ?? path
  return name.replace(/\.txt$/i, '')
}

function parseFolder(
  raw: Record<string, string>,
  folder: FolderName,
): LoadedFile[] {
  const prefix = `${folder}/`
  const files: LoadedFile[] = []
  for (const [path, text] of Object.entries(raw)) {
    if (!path.startsWith(prefix)) continue
    if (!path.toLowerCase().endsWith('.txt')) continue
    // Skip nested subfolders (e.g. Listings/ should not pick up Active/* — we
    // request the exact folder name including the subfolder).
    const rest = path.slice(prefix.length)
    if (rest.includes('/')) continue
    files.push({ path, slug: slugFromPath(path), doc: parseContent(text) })
  }

  // Sort by Order field if present, otherwise by filename (which is why we
  // prefix files with 01-, 02-, etc).
  files.sort((a, b) => {
    const oa = Number(a.doc.fields['order'])
    const ob = Number(b.doc.fields['order'])
    const aHas = Number.isFinite(oa)
    const bHas = Number.isFinite(ob)
    if (aHas && bHas) return oa - ob
    if (aHas) return -1
    if (bHas) return 1
    return a.path.localeCompare(b.path)
  })
  return files
}

export type ContentBundle = {
  brokers: LoadedFile[]
  blog: LoadedFile[]
  active: LoadedFile[]
  underContract: LoadedFile[]
  sold: LoadedFile[]
  testimonials: LoadedFile[]
  featured: LoadedFile | null
}

export async function loadContent(): Promise<ContentBundle> {
  const raw = await loadAllRaw()
  const featuredList = parseFolder(raw, 'Featured Property')
  return {
    brokers: parseFolder(raw, 'Brokers'),
    blog: parseFolder(raw, 'Blog'),
    active: parseFolder(raw, 'Listings/Active'),
    underContract: parseFolder(raw, 'Listings/UnderContract'),
    sold: parseFolder(raw, 'Listings/Sold'),
    testimonials: parseFolder(raw, 'Testimonials'),
    featured: featuredList[0] ?? null,
  }
}

/**
 * Synchronous version that only uses bundled content. Useful as the initial
 * value for hooks so the UI never flashes empty, then it gets replaced with
 * fresh GitHub content when the async load resolves.
 */
export function loadBundledContent(): ContentBundle {
  const raw = bundled
  const featuredList = parseFolder(raw, 'Featured Property')
  return {
    brokers: parseFolder(raw, 'Brokers'),
    blog: parseFolder(raw, 'Blog'),
    active: parseFolder(raw, 'Listings/Active'),
    underContract: parseFolder(raw, 'Listings/UnderContract'),
    sold: parseFolder(raw, 'Listings/Sold'),
    testimonials: parseFolder(raw, 'Testimonials'),
    featured: featuredList[0] ?? null,
  }
}
