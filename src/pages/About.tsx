import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { PHILOSOPHY_PILLARS, SITE } from '../data/site'
import { CtaBanner } from '../components/CtaBanner'
import { useContent, usePrimaryBroker } from '../hooks/contentContext'

export default function About() {
  const { testimonials } = useContent()
  const broker = usePrimaryBroker()

  // Split the broker name for the italic flourish used in the hero.
  const brokerName = broker?.name ?? 'Joni Renee Zalk'
  const nameParts = brokerName.split(' ')
  const firstTwo = nameParts.slice(0, 2).join(' ')
  const rest = nameParts.slice(2).join(' ')

  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            {firstTwo}
            {rest && (
              <>
                {' '}
                <span className="font-display-italic">{rest}</span>
              </>
            )}
          </>
        }
        subtitle={
          <span>
            {broker?.title ?? 'Real Estate Broker'} · {SITE.location}
          </span>
        }
      />

      {/* Portrait + bio */}
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-24 lg:px-10 lg:py-24">
          <div className="relative">
            <figure className="relative overflow-hidden bg-stone shadow-xl">
              <img
                src={broker?.photo || '/images/source/joni_2_small.jpg'}
                alt={brokerName}
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
            <div
              aria-hidden
              className="absolute -bottom-6 -left-6 -z-10 hidden h-full w-full border border-brass lg:block"
            />
          </div>

          <div>
            <p className="eyebrow">A Boulder Story</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="divider-brass" />
            </div>
            <h2 className="font-display mt-6 text-4xl leading-[1.05] text-charcoal md:text-5xl">
              Matchmakers by nature, brokers by training.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
              {(broker?.bio ?? []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-[10px] font-medium tracking-[0.32em] text-brass-deep uppercase">
                  Market
                </dt>
                <dd className="font-display mt-2 text-xl text-charcoal">
                  Boulder & Front Range
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium tracking-[0.32em] text-brass-deep uppercase">
                  Specialties
                </dt>
                <dd className="font-display mt-2 text-xl text-charcoal">
                  Buyers · Sellers · Investors
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium tracking-[0.32em] text-brass-deep uppercase">
                  Background
                </dt>
                <dd className="font-display mt-2 text-xl text-charcoal">
                  Renovation & Investment
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Philosophy pillars */}
      <section className="bg-stone-soft">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-24">
            <div>
              <p className="eyebrow">Approach</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="divider-brass" />
              </div>
              <h2 className="font-display mt-6 text-4xl leading-[1.05] text-charcoal md:text-5xl">
                Personalized guidance. Expert advice. Every step.
              </h2>
              <p className="mt-6 text-ink-soft md:text-lg">
                The right home is the one that fits the life you’re building.
                Here’s how we approach the work of finding it — or selling the
                one you’ve outgrown.
              </p>
            </div>
            <ol className="grid gap-px overflow-hidden border border-line-soft bg-line-soft sm:grid-cols-2">
              {PHILOSOPHY_PILLARS.map((p, i) => (
                <li key={p.title} className="flex flex-col bg-ivory p-8">
                  <p className="font-display text-5xl leading-none text-brass-deep">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display mt-6 text-2xl text-charcoal">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* All testimonials — long-form wall */}
      {testimonials.length > 0 && (
        <section className="bg-ivory">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Client Voices</p>
              <div className="mt-4 flex justify-center">
                <span className="divider-brass" />
              </div>
              <h2 className="font-display mt-6 text-4xl leading-[1.05] text-charcoal md:text-5xl">
                Every kind word, on the record.
              </h2>
              <p className="mt-6 text-ink-soft md:text-lg">
                A complete archive of testimonials shared by past buyers and
                sellers across the Front Range.
              </p>
            </div>

            <div className="mt-16 columns-1 gap-8 md:columns-2 lg:columns-3 [&>*]:mb-8">
              {testimonials.map((t, i) => (
                <figure
                  key={i}
                  className="break-inside-avoid border border-line-soft bg-paper p-7 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="font-display text-4xl leading-none text-brass">
                    &ldquo;
                  </span>
                  <blockquote className="-mt-4 text-sm leading-relaxed text-ink-soft">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line-soft pt-4 text-[10px] font-medium tracking-[0.32em] text-charcoal uppercase">
                    — {t.author}
                    {t.detail && (
                      <span className="block pt-1 text-ink-muted normal-case tracking-[0.18em]">
                        {t.detail}
                      </span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Boulder local color */}
      <section className="relative isolate overflow-hidden">
        <img
          src="/images/source/flatirons_hero_bg.jpg"
          alt="Boulder Flatirons"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/55 to-charcoal/30" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center text-ivory lg:px-10 lg:py-32">
          <p className="eyebrow-light">Local Expertise</p>
          <div className="mt-4 flex justify-center">
            <span className="inline-block h-px w-12 bg-brass" />
          </div>
          <h2 className="font-display mt-6 text-4xl leading-[1.05] text-ivory md:text-5xl lg:text-6xl">
            Boulder isn’t a market —{' '}
            <span className="font-display-italic">it’s the place we call home.</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-ivory/80 md:text-lg">
            From Chautauqua trailheads to NoBo studios, knowing this town means
            knowing what it feels like to live in each neighborhood — and what
            each home is really worth to the person walking through it.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 border border-brass bg-brass px-8 py-4 text-[11px] font-medium tracking-[0.28em] text-charcoal uppercase transition-all hover:bg-brass-soft hover:tracking-[0.32em]"
          >
            Let’s Connect
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <CtaBanner
        eyebrow="Work With Us"
        title="A first conversation is always free."
        body="Tell us what you’re looking for — a starter home, a forever home, an investment, or a renovation project — and we’ll lay out the most direct path to get there."
      />
    </>
  )
}
