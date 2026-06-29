import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { PropertyCard } from '../components/PropertyCard'
import { CtaBanner } from '../components/CtaBanner'
import { useContent } from '../hooks/contentContext'

export default function Properties() {
  const { active, underContract, sold } = useContent()

  const categories = [
    {
      label: 'Active Listings',
      to: '/properties/active',
      count: active.length,
      image: active[0]?.image ?? '',
    },
    {
      label: 'Under Contract',
      to: '/properties/under-contract',
      count: underContract.length,
      image: underContract[0]?.image ?? '',
    },
    {
      label: 'Sold',
      to: '/properties/sold',
      count: sold.length,
      image: sold[0]?.image ?? '',
    },
  ]

  return (
    <>
      <PageHero
        eyebrow="Properties"
        title={
          <>
            A curated portfolio of{' '}
            <span className="font-display-italic">Boulder homes</span>.
          </>
        }
        subtitle="Browse the current listings, the homes already under contract, and a record of recent closings across the Front Range."
      />

      {/* Category cards */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden bg-charcoal text-ivory"
              >
                {c.image && (
                  <img
                    src={c.image}
                    alt={c.label}
                    className="absolute inset-0 h-full w-full object-cover opacity-65 transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-50"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent" />
                <div className="relative p-8 lg:p-10">
                  <p className="text-[10px] font-medium tracking-[0.32em] text-brass-soft uppercase">
                    {c.count} {c.count === 1 ? 'property' : 'properties'}
                  </p>
                  <h3 className="font-display mt-3 text-3xl leading-tight text-ivory md:text-4xl">
                    {c.label}
                  </h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] text-brass-soft uppercase">
                    Browse
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All listings preview */}
      <section className="bg-stone-soft">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Currently Available</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="divider-brass" />
              </div>
              <h2 className="font-display mt-6 text-4xl leading-[1.05] text-charcoal md:text-5xl">
                Active listings
              </h2>
            </div>
            <Link
              to="/properties/active"
              className="text-[11px] tracking-[0.28em] text-charcoal uppercase transition-colors hover:text-brass-deep"
            >
              View All →
            </Link>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {active.slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Looking for something specific?"
        title="Tell us what you’re looking for."
        body="We keep a running list of off-market opportunities and pre-listings. If your search has a specific shape, we can help you find it."
      />
    </>
  )
}
