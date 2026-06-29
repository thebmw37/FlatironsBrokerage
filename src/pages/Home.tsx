import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowDown, MapPin, Bed, Bath, Maximize } from 'lucide-react'
import { PHILOSOPHY_PILLARS, SITE } from '../data/site'
import { PropertyCard } from '../components/PropertyCard'
import { TestimonialCarousel } from '../components/TestimonialCarousel'
import { SectionHeader } from '../components/SectionHeader'
import { CtaBanner } from '../components/CtaBanner'
import { useContent, usePrimaryBroker } from '../hooks/contentContext'

export default function Home() {
  const { active, testimonials, featured } = useContent()
  const broker = usePrimaryBroker()

  return (
    <>
      {/* HERO — full-bleed Flatirons image with brand name overlay */}
      <section className="relative isolate -mt-20 h-[92vh] min-h-[640px] w-full overflow-hidden lg:-mt-24">
        <img
          src="/images/source/chautauqua-flatirons.jpg"
          alt="The Flatirons rising above Chautauqua Park in Boulder, Colorado"
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/35 via-charcoal/15 to-charcoal/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/35 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pt-32 pb-20 lg:px-10 lg:pb-28">
          <p className="animate-fade-up text-[11px] font-medium tracking-[0.42em] text-brass-soft uppercase">
            Exceptional Boulder Real Estate
          </p>
          <div className="animate-fade-up mt-5 flex items-center gap-4">
            <span className="inline-block h-px w-12 bg-brass" />
            <span className="text-[11px] tracking-[0.32em] text-ivory/70 uppercase">
              Est. {SITE.copyrightYear}
            </span>
          </div>
          <h1 className="font-display animate-fade-up mt-6 text-6xl leading-[0.95] text-ivory md:text-7xl lg:text-[7.5rem]">
            {SITE.name}
          </h1>
          <p className="font-display-italic animate-fade-up mt-6 max-w-2xl text-2xl text-ivory/85 md:text-3xl">
            {SITE.location}
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-brass bg-brass px-8 py-4 text-[11px] font-medium tracking-[0.28em] text-charcoal uppercase transition-all hover:bg-brass-soft hover:tracking-[0.32em]"
            >
              Contact Us
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 border border-ivory/40 px-8 py-4 text-[11px] font-medium tracking-[0.28em] text-ivory uppercase transition-all hover:border-brass hover:text-brass-soft hover:tracking-[0.32em]"
            >
              View Properties
            </Link>
          </div>
        </div>

        <div className="absolute right-6 bottom-6 z-10 hidden items-center gap-2 text-[10px] tracking-[0.32em] text-ivory/60 uppercase lg:flex">
          <span>Scroll</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </div>
      </section>

      {/* PHILOSOPHY pillars */}
      <section className="bg-stone-soft">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
          <SectionHeader
            eyebrow="How We Work"
            title={
              <>
                A matchmaker’s approach to{' '}
                <span className="font-display-italic">real estate</span>
              </>
            }
            body="Every transaction begins with listening. From there, the path forward is shaped around what you actually want — not what fits on a checklist."
          />
          <div className="mt-16 grid gap-px overflow-hidden border border-line-soft bg-line-soft md:grid-cols-2 lg:grid-cols-4">
            {PHILOSOPHY_PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="flex flex-col bg-ivory p-8 lg:p-10"
              >
                <p className="font-display text-5xl leading-none text-brass-deep">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display mt-6 text-2xl leading-tight text-charcoal">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT — Broker introduction */}
      {broker && (
        <section className="relative bg-ivory">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-24 lg:px-10 lg:py-32">
            <div className="relative order-2 lg:order-1">
              <figure className="relative overflow-hidden bg-stone shadow-xl">
                <img
                  src={broker.photo || '/images/source/joni_2_small.jpg'}
                  alt={broker.name}
                  className="aspect-[4/5] w-full object-cover"
                />
              </figure>
              <div
                aria-hidden
                className="absolute -bottom-6 -left-6 -z-10 hidden h-full w-full border border-brass lg:block"
              />
              <div className="absolute -right-2 -bottom-8 hidden bg-charcoal px-8 py-6 text-ivory shadow-2xl lg:block">
                <p className="text-[10px] font-medium tracking-[0.32em] text-brass-soft uppercase">
                  Boulder Native Market
                </p>
                <p className="font-display mt-2 text-2xl">20+ Years</p>
                <p className="text-xs text-ivory/65">of matchmaking buyers & homes</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="eyebrow">Meet Our Founder</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="divider-brass" />
              </div>
              <h2 className="font-display mt-6 text-5xl leading-[1.05] text-charcoal md:text-6xl">
                {broker.name}
              </h2>
              <p className="font-display-italic mt-3 text-xl text-brass-deep md:text-2xl">
                {broker.title}
              </p>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
                {broker.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Link
                to="/about"
                className="mt-10 inline-flex items-center gap-2 border-b border-charcoal/30 pb-1 text-[11px] font-medium tracking-[0.28em] text-charcoal uppercase transition-colors hover:border-brass hover:text-brass-deep"
              >
                Read the full story
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* EXCLUSIVE LISTINGS — preview */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Exclusive Listings</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="divider-brass" />
              </div>
              <h2 className="font-display mt-6 text-4xl leading-[1.05] text-charcoal md:text-5xl lg:text-6xl">
                A curated portfolio of Boulder homes.
              </h2>
            </div>
            <Link
              to="/properties/active"
              className="inline-flex items-center gap-2 border border-charcoal px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] text-charcoal uppercase transition-all hover:bg-charcoal hover:text-ivory hover:tracking-[0.32em]"
            >
              All Active Listings
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {active.slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — dark section */}
      {testimonials.length > 0 && (
        <section className="relative isolate overflow-hidden bg-charcoal text-ivory">
          <img
            src="/images/source/cta_bg.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-10"
          />
          <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
            <SectionHeader
              eyebrow="Testimonials"
              title={
                <>
                  In their <span className="font-display-italic">own words</span>
                </>
              }
              variant="dark"
            />
            <div className="mt-16">
              <TestimonialCarousel items={testimonials} />
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PROPERTY */}
      {featured && (
        <section className="bg-ivory-deep">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-20">
              <figure className="relative overflow-hidden bg-stone shadow-2xl">
                <img
                  src={featured.heroImage}
                  alt={`Featured property — ${featured.address}`}
                  className="aspect-[5/4] w-full object-cover"
                />
                <figcaption className="absolute top-5 left-5 bg-ivory/95 px-4 py-2 text-[10px] font-medium tracking-[0.32em] text-charcoal uppercase backdrop-blur">
                  {featured.status}
                </figcaption>
              </figure>

              <div>
                <p className="eyebrow">Featured Property</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="divider-brass" />
                </div>
                <h2 className="font-display mt-6 text-4xl leading-[1.05] text-charcoal md:text-5xl">
                  {featured.address}
                </h2>
                <p className="mt-3 flex items-center gap-2 text-sm tracking-[0.18em] text-ink-muted uppercase">
                  <MapPin className="h-4 w-4 text-brass-deep" />
                  {featured.cityState}
                </p>

                <ul className="mt-8 grid grid-cols-3 gap-2 border-y border-line py-6">
                  <li className="flex flex-col items-center gap-2 text-center">
                    <Bed className="h-5 w-5 text-brass-deep" />
                    <span className="font-display text-2xl text-charcoal">
                      {featured.bedrooms}
                    </span>
                    <span className="text-[10px] tracking-[0.28em] text-ink-muted uppercase">
                      Bedrooms
                    </span>
                  </li>
                  <li className="flex flex-col items-center gap-2 border-x border-line text-center">
                    <Bath className="h-5 w-5 text-brass-deep" />
                    <span className="font-display text-2xl text-charcoal">
                      {featured.bathsFull}
                      <span className="text-base">·{featured.bathsHalf}</span>
                    </span>
                    <span className="text-[10px] tracking-[0.28em] text-ink-muted uppercase">
                      Full · Half
                    </span>
                  </li>
                  <li className="flex flex-col items-center gap-2 text-center">
                    <Maximize className="h-5 w-5 text-brass-deep" />
                    <span className="font-display text-2xl text-charcoal">
                      {featured.squareFeet}
                    </span>
                    <span className="text-[10px] tracking-[0.28em] text-ink-muted uppercase">
                      Sq Feet
                    </span>
                  </li>
                </ul>

                <p className="mt-8 text-base leading-relaxed text-ink-soft">
                  {featured.description}
                </p>

                {featured.highlights.length > 0 && (
                  <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                    {featured.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <span className="mt-2 h-px w-4 shrink-0 bg-brass" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  to="/contact"
                  className="mt-10 inline-flex items-center gap-2 border border-charcoal bg-charcoal px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] text-ivory uppercase transition-all hover:bg-graphite hover:tracking-[0.32em]"
                >
                  Inquire About This Property
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CtaBanner
        eyebrow="Work With Us"
        title="Ready to start your real estate journey?"
        body="Whether you’re looking to buy your dream home, sell your property, or explore investment opportunities, we’re here to help you every step of the way."
        primary={{ label: 'Contact Us', to: '/contact' }}
        secondary={{ label: 'View Properties', to: '/properties' }}
      />
    </>
  )
}
