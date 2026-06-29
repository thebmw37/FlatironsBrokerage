import { ArrowUpRight, Clock } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { CtaBanner } from '../components/CtaBanner'
import { useContent } from '../hooks/contentContext'

export default function Blog() {
  const { blog } = useContent()
  const [featured, ...rest] = blog

  return (
    <>
      <PageHero
        eyebrow="Field Notes"
        title={
          <>
            Notes from the <span className="font-display-italic">Front Range</span>
          </>
        }
        subtitle="Boulder market commentary, broker’s perspective, and the occasional renovation story — written for buyers, sellers, and investors who want clarity over hype."
      />

      {featured && (
        <section className="bg-ivory">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <p className="eyebrow">Featured</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="divider-brass" />
            </div>

            <article className="mt-12 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-20">
              <figure className="relative overflow-hidden bg-stone shadow-xl">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="aspect-[5/4] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <figcaption className="absolute top-5 left-5 bg-ivory/95 px-4 py-2 text-[10px] font-medium tracking-[0.32em] text-charcoal uppercase backdrop-blur">
                  {featured.category}
                </figcaption>
              </figure>

              <div>
                <p className="flex items-center gap-4 text-[10px] font-medium tracking-[0.32em] text-ink-muted uppercase">
                  <span>{featured.date}</span>
                  <span className="inline-block h-px w-6 bg-line" />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {featured.readMinutes} min read
                  </span>
                </p>
                <h2 className="font-display mt-6 text-4xl leading-[1.05] text-charcoal md:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
                  {featured.excerpt}
                </p>
                <button
                  type="button"
                  className="mt-10 inline-flex items-center gap-2 border border-charcoal bg-charcoal px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] text-ivory uppercase transition-all hover:bg-graphite hover:tracking-[0.32em]"
                >
                  Read the post
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="bg-ivory-deep">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Recent Posts</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="divider-brass" />
              </div>
              <h2 className="font-display mt-6 text-3xl leading-[1.1] text-charcoal md:text-4xl">
                More from the journal
              </h2>
            </div>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col"
              >
                <figure className="relative overflow-hidden bg-stone">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute top-4 left-4 bg-ivory/95 px-3 py-1.5 text-[10px] font-medium tracking-[0.28em] text-charcoal uppercase backdrop-blur">
                    {post.category}
                  </figcaption>
                </figure>
                <div className="mt-6">
                  <p className="flex items-center gap-3 text-[10px] font-medium tracking-[0.28em] text-ink-muted uppercase">
                    <span>{post.date}</span>
                    <span className="inline-block h-px w-4 bg-line" />
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {post.readMinutes} min
                    </span>
                  </p>
                  <h3 className="font-display mt-4 text-2xl leading-tight text-charcoal transition-colors group-hover:text-brass-deep">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 border-b border-charcoal/30 pb-1 text-[11px] font-medium tracking-[0.28em] text-charcoal uppercase transition-colors hover:border-brass hover:text-brass-deep"
                  >
                    Read more
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Stay In Touch"
        title="Have a question we should write about?"
        body="If there’s a Boulder market question on your mind — buying, selling, investing, or renovating — send it over. The best posts here started as a client’s question."
        primary={{ label: 'Contact Us', to: '/contact' }}
        secondary={{ label: 'View Properties', to: '/properties' }}
      />
    </>
  )
}
