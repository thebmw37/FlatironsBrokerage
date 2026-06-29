/**
 * Parser for the brokerage content .txt format.
 *
 * Format (see content/README.md for human docs):
 *
 *   # Comments start with a hash.
 *
 *   Key: Value
 *   AnotherKey: Another value
 *   Highlight: First bullet
 *   Highlight: Second bullet   ← repeating a key returns a list
 *
 *   ---
 *
 *   Optional body text. Blank lines separate paragraphs.
 *
 *   Another paragraph.
 */

export type ParsedDoc = {
  /** Lowercased single-value fields. Last-wins if a non-repeating key appears twice. */
  fields: Record<string, string>
  /** Lowercased multi-value fields (any key that appeared more than once). */
  lists: Record<string, string[]>
  /** Free-form body, split into paragraphs (blank-line separated). */
  paragraphs: string[]
  /** Full raw body, for cases that want a single string. */
  body: string
}

const SEPARATOR_RE = /^---+\s*$/

export function parseContent(input: string): ParsedDoc {
  const text = input.replace(/\r\n?/g, '\n')
  const lines = text.split('\n')

  // Multi-occurrence buckets — we only know if a key is a list after we've
  // seen it twice, so collect everything as an array first then split.
  const buckets: Record<string, string[]> = {}
  const bodyLines: string[] = []

  let inBody = false

  for (const rawLine of lines) {
    if (!inBody && SEPARATOR_RE.test(rawLine)) {
      inBody = true
      continue
    }

    if (inBody) {
      bodyLines.push(rawLine)
      continue
    }

    const line = rawLine.trim()
    if (!line) continue
    if (line.startsWith('#')) continue

    const colon = line.indexOf(':')
    if (colon === -1) {
      // Bare line in the metadata section — treat as an implicit body line
      // so authors don't lose content if they forget the separator.
      bodyLines.push(rawLine)
      continue
    }

    const key = line.slice(0, colon).trim().toLowerCase()
    if (!key) continue
    const value = line.slice(colon + 1).trim()

    if (!buckets[key]) buckets[key] = []
    buckets[key].push(value)
  }

  const fields: Record<string, string> = {}
  const lists: Record<string, string[]> = {}
  for (const [key, values] of Object.entries(buckets)) {
    if (values.length > 1) {
      lists[key] = values
    } else {
      fields[key] = values[0]
    }
    // Also expose the last value via `fields` for callers who only want one.
    if (!(key in fields)) fields[key] = values[values.length - 1]
  }

  // Trim leading / trailing blank lines from the body but preserve internal
  // blank lines (those are paragraph breaks).
  let start = 0
  let end = bodyLines.length
  while (start < end && bodyLines[start].trim() === '') start++
  while (end > start && bodyLines[end - 1].trim() === '') end--
  const trimmedBodyLines = bodyLines.slice(start, end)
  const body = trimmedBodyLines.join('\n')

  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return { fields, lists, paragraphs, body }
}

/** Convenience accessors with safe defaults and type coercion. */
export function str(doc: ParsedDoc, key: string, fallback = ''): string {
  return doc.fields[key.toLowerCase()] ?? fallback
}

export function num(doc: ParsedDoc, key: string): number | undefined {
  const v = doc.fields[key.toLowerCase()]
  if (v == null || v === '') return undefined
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}

export function list(doc: ParsedDoc, key: string): string[] {
  const k = key.toLowerCase()
  if (doc.lists[k]) return doc.lists[k]
  if (doc.fields[k]) return [doc.fields[k]]
  return []
}
