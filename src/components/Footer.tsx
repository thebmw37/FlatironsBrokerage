import { Link } from 'react-router-dom'
import { Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { QUICK_LINKS, SITE } from '../data/site'
import { Monogram } from './Monogram'
import { usePrimaryBroker } from '../hooks/contentContext'

export function Footer() {
  const broker = usePrimaryBroker()
  const email = broker?.email || SITE.contact.email
  const mailto = `mailto:${email}`
  return (
    <footer className="bg-charcoal text-ivory/85">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Monogram className="h-11 w-11 text-brass" />
              <div className="leading-tight">
                <p className="font-display text-2xl text-ivory">
                  {SITE.name}
                </p>
                <p className="mt-1 text-[10px] font-medium tracking-[0.32em] text-brass-soft uppercase">
                  Boulder · Colorado
                </p>
              </div>
            </div>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-ivory/65">
              {SITE.shortAbout}
            </p>
            <p className="mt-8 text-[10px] tracking-[0.32em] text-brass-soft uppercase">
              Est. {SITE.copyrightYear}
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-medium tracking-[0.32em] text-brass-soft uppercase">
              Sitemap
            </h4>
            <ul className="mt-6 space-y-3 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-display text-base text-ivory/85 transition-colors hover:text-brass-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-medium tracking-[0.32em] text-brass-soft uppercase">
              Contact
            </h4>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href={mailto}
                  className="flex items-start gap-3 text-ivory/75 transition-colors hover:text-brass-soft"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  <span className="break-all">{email}</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-ivory/75">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  {SITE.contact.cityState}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-medium tracking-[0.32em] text-brass-soft uppercase">
              Start a Conversation
            </h4>
            <p className="mt-6 text-sm leading-relaxed text-ivory/65">
              Whether you’re buying, selling, investing, or renovating — let’s
              talk about what you’re looking for.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 border border-ivory/30 px-5 py-3 text-[11px] tracking-[0.28em] text-ivory uppercase transition-colors hover:border-brass hover:text-brass-soft"
            >
              Schedule a visit
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-line-bright">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-7 text-xs text-ivory/55 sm:flex-row lg:px-10">
          <p>
            © {SITE.copyrightYear}{' '}
            <span className="text-ivory/80">{SITE.name}</span>. All rights reserved.
          </p>
          <p className="tracking-[0.28em] uppercase">
            {broker?.name ?? 'Joni Renee Zalk'} ·{' '}
            {broker?.shortTitle ?? 'Real Estate Broker'}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
