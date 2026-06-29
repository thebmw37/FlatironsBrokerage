/**
 * Static site configuration that doesn't come from the GitHub content repo.
 * Editable content (broker bios, blog posts, listings, testimonials, the
 * featured property) all lives in /content as .txt files and is loaded
 * dynamically by `useContent()` — see content/README.md for the format.
 */

export const SITE = {
  name: 'Flatirons Brokerage',
  tagline: 'Exceptional Real Estate',
  location: 'Boulder, Colorado',
  shortAbout:
    'Personalized guidance for buyers, sellers, investors, and renovators across the Boulder market.',
  /** Contact details fall back to these if no broker file is present. */
  contact: {
    email: 'joni@flatironsbrokerage.com',
    emailMailto: 'mailto:joni@flatironsbrokerage.com',
    cityState: 'Boulder, CO',
  },
  copyrightYear: 2025,
} as const

export type NavItem = {
  label: string
  to: string
  children?: NavItem[]
}

export const NAV: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  {
    label: 'Properties',
    to: '/properties',
    children: [
      { label: 'Active Listings', to: '/properties/active' },
      { label: 'Under Contract', to: '/properties/under-contract' },
      { label: 'Sold', to: '/properties/sold' },
    ],
  },
  { label: 'Contact', to: '/contact' },
]

export const QUICK_LINKS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'Properties', to: '/properties' },
  { label: 'Active Listings', to: '/properties/active' },
  { label: 'Under Contract', to: '/properties/under-contract' },
  { label: 'Sold', to: '/properties/sold' },
  { label: 'Contact', to: '/contact' },
]

export const STATS = [
  { value: '20+', label: 'Years matching homes and buyers' },
  { value: 'Boulder', label: 'Front Range native market' },
  { value: '5★', label: 'Client reviews, time after time' },
] as const

/**
 * The "philosophy" pillars are intentionally static (they describe how the
 * brokerage operates and rarely change). If we want to move them into the
 * editable content later, mirror this shape in a `Philosophy/` folder.
 */
export const PHILOSOPHY_PILLARS = [
  {
    title: 'Matchmaker’s instinct',
    body: 'Real strategy starts with listening. We ask the questions that surface what you actually want — not just what fits on a checklist.',
  },
  {
    title: 'Buyer & investor fluency',
    body: 'From first-time buyers to seasoned investors with rental portfolios, we shape the search and the offer around the outcome you want.',
  },
  {
    title: 'Renovator’s eye',
    body: 'Years of buying, renovating, and reselling mean we can spot value, flag risk, and translate a home’s potential into a clear plan.',
  },
  {
    title: 'Seamless representation',
    body: 'Marketing, pricing, staging, negotiation, and closing — handled with the integrity and follow-through our clients call out by name.',
  },
] as const

// ---------- Re-exports for compatibility ----------
// These types used to be defined here. They're now produced by the content
// pipeline; re-export from the new location so existing imports keep working.

export type { BlogPost, Testimonial } from '../lib/contentViews'
