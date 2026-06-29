# Flatirons Brokerage — realtorJoni

A redesign of [flatironsbrokerage.com](https://www.flatironsbrokerage.com/) for Joni Renee Zalk, built to evoke the luxury real estate aesthetic of sites like Burris Real Estate while preserving the original site's content, voice, and imagery.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** with a custom design token theme (ivory/charcoal/brass palette, Cormorant Garamond + Inter)
- **React Router v7** for client-side navigation
- **lucide-react** for icons
- **Playwright** (dev-only) for crawling source imagery from the client's existing Squarespace site

## Routes

| Path | Page | Purpose |
|---|---|---|
| `/` | Home | Hero, broker intro, philosophy, exclusive listings, testimonials carousel, featured property, CTA |
| `/about` | About | Long-form bio, philosophy pillars, full testimonial wall, local-color Flatirons section |
| `/properties` | Properties | Hub linking to Active / Under Contract / Sold + active preview |
| `/properties/active` | Active Listings | Full grid of homes currently for sale |
| `/properties/under-contract` | Under Contract | Pending transactions |
| `/properties/sold` | Sold | Recent closings |
| `/contact` | Contact | Direct line + inquiry form (mailto submission) |

## Design system

All design tokens are defined in `src/index.css` under `@theme`:

- **Surfaces:** `ivory`, `ivory-deep`, `stone`, `stone-soft`, `paper`
- **Brand:** `charcoal`, `charcoal-soft`, `graphite`, `brass`, `brass-soft`, `brass-deep`
- **Type:** `font-display` (Cormorant Garamond, with `.font-display-italic` variant) and `font-sans` (Inter)
- **Conventions:** all-caps tracked eyebrows (`.eyebrow`), thin brass dividers (`.divider-brass`), full-bleed hero with slow zoom, masonry testimonial wall

## Content

Editable content (broker bios, blog posts, listings, testimonials, the
featured property) lives in **plain `.txt` files** under [`content/`](./content)
and is loaded dynamically at runtime from the GitHub repo
[`thebmw37/FlatironsBrokerage`](https://github.com/thebmw37/FlatironsBrokerage).
The website ships with a copy of every file under `content/` as a fallback,
so it still renders correctly if GitHub is unreachable.

To edit content, see [`content/README.md`](./content/README.md). It documents
the file format and shows how to add or change listings, blog posts, and
testimonials directly through the GitHub web UI — no developer involvement
required.

Static configuration that doesn't change (navigation, the "how we work"
pillars, site name) still lives in `src/data/site.ts`.

## Imagery

All hero/property/portrait imagery was downloaded from the client's existing site into `public/images/source/`. To re-run the crawl (e.g. after the client uploads new photos):

```bash
npm run crawl-images
```

The script uses Playwright to visit `/`, `/contact`, and `/properties`, scrapes every `<img>` tag and background-image URL, and writes them to `public/images/source/` with their original filenames.

## Scripts

```bash
npm run dev             # Vite dev server on http://localhost:5173
npm run build           # Type-check + production build
npm run preview         # Preview the production build
npm run lint            # ESLint
npm run crawl-images    # Re-download imagery from flatironsbrokerage.com
npm run verify-content  # Smoke-test that .txt content renders on every page
```

## Project layout

```
realtorJoni/
├── content/                    # 📄 EDITABLE CONTENT (see content/README.md)
│   ├── Brokers/                #   broker bios
│   ├── Blog/                   #   blog posts
│   ├── Listings/
│   │   ├── Active/             #   homes for sale
│   │   ├── UnderContract/      #   pending transactions
│   │   └── Sold/               #   recent closings
│   ├── Testimonials/           #   client testimonials
│   └── Featured Property/      #   home-page featured listing
├── public/
│   └── images/source/          # Imagery pulled from existing site
├── scripts/
│   ├── crawl-images.ts         # Playwright image crawler
│   ├── screenshot.ts           # Full-page screenshot capture (dev review)
│   └── verify-content.ts       # Smoke-test that .txt content renders
├── src/
│   ├── components/             # Layout, Header, Footer, PageHero, CtaBanner,
│   │                           # SectionHeader, TestimonialCarousel,
│   │                           # PropertyCard, PropertyGrid, Monogram
│   ├── data/
│   │   ├── site.ts             # Static site config (nav, philosophy, etc.)
│   │   └── properties.ts       # Re-exports Property types
│   ├── hooks/
│   │   ├── contentContext.ts   # React context + hooks (useContent, ...)
│   │   └── useContent.tsx      # ContentProvider that loads from GitHub
│   ├── lib/
│   │   ├── contentParser.ts    # .txt → ParsedDoc
│   │   ├── contentLoader.ts    # GitHub fetcher + bundled fallback + cache
│   │   └── contentViews.ts     # ParsedDoc → typed UI shapes
│   ├── pages/                  # Home / About / Blog / Properties / Active /
│   │                           # UnderContract / Sold / Contact
│   ├── App.tsx                 # Router config
│   ├── main.tsx                # React entry (wraps app in ContentProvider)
│   └── index.css               # Tailwind + theme tokens
├── index.html
├── vite.config.ts
└── package.json
```
