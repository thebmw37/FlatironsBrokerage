import { useEffect, useState } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Testimonial } from '../data/site'

type Props = {
  items: Testimonial[]
  autoplayMs?: number
}

export function TestimonialCarousel({ items, autoplayMs = 8000 }: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || items.length <= 1) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, autoplayMs)
    return () => clearInterval(t)
  }, [paused, items.length, autoplayMs])

  const next = () => setIndex((i) => (i + 1) % items.length)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)

  const t = items[index]

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Quote className="mx-auto h-10 w-10 text-brass" />

      <div className="mt-8 min-h-[200px]">
        <blockquote className="mx-auto max-w-3xl text-center">
          <p
            key={index}
            className="font-display animate-fade-in text-2xl leading-[1.4] text-ivory md:text-3xl"
          >
            &ldquo;{t.quote}&rdquo;
          </p>
          <footer className="mt-10">
            <div className="flex items-center justify-center gap-3">
              <span className="inline-block h-px w-8 bg-brass" />
              <cite className="text-[11px] font-medium tracking-[0.32em] text-brass-soft not-italic uppercase">
                {t.author}
                {t.detail ? ` · ${t.detail}` : ''}
              </cite>
              <span className="inline-block h-px w-8 bg-brass" />
            </div>
          </footer>
        </blockquote>
      </div>

      <div className="mt-12 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="grid h-11 w-11 place-items-center border border-ivory/25 text-ivory/80 transition-colors hover:border-brass hover:text-brass-soft"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 transition-all ${
                i === index ? 'w-8 bg-brass' : 'w-1.5 bg-ivory/30 hover:bg-ivory/60'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="grid h-11 w-11 place-items-center border border-ivory/25 text-ivory/80 transition-colors hover:border-brass hover:text-brass-soft"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default TestimonialCarousel
