import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  eyebrow?: string
  title: string
  body: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
}

export function CtaBanner({
  eyebrow = 'Work With Us',
  title,
  body,
  primary = { label: 'Contact Us', to: '/contact' },
  secondary = { label: 'View Properties', to: '/properties' },
}: Props) {
  return (
    <section className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-light">{eyebrow}</p>
          <div className="mt-5 flex justify-center">
            <span className="inline-block h-px w-12 bg-brass" />
          </div>
          <h2 className="font-display mt-7 text-4xl leading-[1.1] text-ivory md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-7 text-base leading-relaxed text-ivory/70 md:text-lg">
            {body}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to={primary.to}
              className="inline-flex items-center gap-2 border border-brass bg-brass px-8 py-3.5 text-[11px] font-medium tracking-[0.28em] text-charcoal uppercase transition-all hover:bg-brass-soft hover:tracking-[0.32em]"
            >
              {primary.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to={secondary.to}
              className="inline-flex items-center gap-2 border border-ivory/30 px-8 py-3.5 text-[11px] font-medium tracking-[0.28em] text-ivory uppercase transition-all hover:border-brass hover:text-brass-soft hover:tracking-[0.32em]"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaBanner
