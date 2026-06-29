/**
 * View-models that map raw parsed content into the shapes the UI components
 * already expect. Keeps the page components clean of parsing details.
 */

import type { LoadedFile } from './contentLoader'
import { list, num, str, type ParsedDoc } from './contentParser'

// ---------- Properties (listings) ----------

export type PropertyStatus = 'active' | 'under-contract' | 'sold'

export type Property = {
  id: string
  status: PropertyStatus
  address: string
  cityState: string
  image: string
  alt: string
  beds?: number
  baths?: number
  sqft?: string
  blurb?: string
}

function cityState(doc: ParsedDoc): string {
  const city = str(doc, 'city')
  const state = str(doc, 'state')
  const zip = str(doc, 'zip')
  const left = [city, state].filter(Boolean).join(', ')
  return zip ? `${left} ${zip}`.trim() : left
}

function listingToProperty(file: LoadedFile, status: PropertyStatus): Property {
  const d = file.doc
  return {
    id: str(d, 'slug') || file.slug,
    status,
    address: str(d, 'address', 'Property'),
    cityState: cityState(d),
    image: str(d, 'image'),
    alt: str(d, 'alt', str(d, 'address', 'Property image')),
    beds: num(d, 'beds'),
    baths: num(d, 'baths'),
    sqft: str(d, 'squarefeet') || undefined,
    blurb: d.paragraphs[0] || str(d, 'blurb') || undefined,
  }
}

export function toProperties(
  files: LoadedFile[],
  status: PropertyStatus,
): Property[] {
  return files.map((f) => listingToProperty(f, status))
}

export const STATUS_LABEL: Record<PropertyStatus, string> = {
  active: 'Active Listing',
  'under-contract': 'Under Contract',
  sold: 'Sold',
}

// ---------- Featured property ----------

export type FeaturedProperty = {
  address: string
  cityState: string
  status: string
  squareFeet: string
  bedrooms: number
  bathsFull: number
  bathsHalf: number
  description: string
  highlights: string[]
  heroImage: string
}

export function toFeatured(file: LoadedFile | null): FeaturedProperty | null {
  if (!file) return null
  const d = file.doc
  return {
    address: str(d, 'address'),
    cityState: cityState(d),
    status: str(d, 'status', 'Featured Listing'),
    squareFeet: str(d, 'squarefeet'),
    bedrooms: num(d, 'beds') ?? num(d, 'bedrooms') ?? 0,
    bathsFull: num(d, 'bathsfull') ?? 0,
    bathsHalf: num(d, 'bathshalf') ?? 0,
    description: d.paragraphs.join('\n\n') || str(d, 'description'),
    highlights: list(d, 'highlight'),
    heroImage: str(d, 'image'),
  }
}

// ---------- Blog posts ----------

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readMinutes: number
  image: string
}

export function toBlogPosts(files: LoadedFile[]): BlogPost[] {
  return files.map((file) => {
    const d = file.doc
    return {
      slug: str(d, 'slug') || file.slug,
      title: str(d, 'title', file.slug),
      excerpt: str(d, 'excerpt', d.paragraphs[0] ?? ''),
      category: str(d, 'category', 'Notes'),
      date: str(d, 'date', ''),
      readMinutes: num(d, 'readminutes') ?? 0,
      image: str(d, 'image'),
    }
  })
}

// ---------- Testimonials ----------

export type Testimonial = {
  quote: string
  author: string
  detail?: string
}

export function toTestimonials(files: LoadedFile[]): Testimonial[] {
  const out: Testimonial[] = []
  for (const file of files) {
    const d = file.doc
    const quote = d.paragraphs.join('\n\n') || str(d, 'quote')
    const author = str(d, 'author')
    if (!quote || !author) continue
    const detail = str(d, 'detail')
    out.push(detail ? { quote, author, detail } : { quote, author })
  }
  return out
}

// ---------- Brokers ----------

export type Broker = {
  id: string
  name: string
  title: string
  shortTitle: string
  email: string
  photo: string
  bio: string[]
}

export function toBrokers(files: LoadedFile[]): Broker[] {
  return files.map((file) => {
    const d = file.doc
    return {
      id: file.slug,
      name: str(d, 'name', 'Broker'),
      title: str(d, 'title', 'Real Estate Broker'),
      shortTitle: str(d, 'shorttitle', str(d, 'title', 'Real Estate Broker')),
      email: str(d, 'email'),
      photo: str(d, 'photo'),
      bio: d.paragraphs,
    }
  })
}
