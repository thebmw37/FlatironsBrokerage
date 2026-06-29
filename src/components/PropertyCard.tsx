import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { type Property, STATUS_LABEL } from '../data/properties'

type Props = {
  property: Property
  variant?: 'default' | 'compact'
}

export function PropertyCard({ property, variant = 'default' }: Props) {
  const compact = variant === 'compact'
  return (
    <article className="group flex flex-col bg-paper transition-all duration-500 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-stone">
        <img
          src={property.image}
          alt={property.alt}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105 ${
            compact ? 'aspect-[4/3]' : 'aspect-[5/4]'
          }`}
        />
        <span className="absolute top-4 left-4 bg-charcoal/90 px-3 py-1.5 text-[10px] font-medium tracking-[0.28em] text-ivory uppercase backdrop-blur">
          {STATUS_LABEL[property.status]}
        </span>
      </div>
      <div className="border-t border-line-soft px-1 pt-6 pb-2">
        <p className="text-[10px] font-medium tracking-[0.32em] text-brass-deep uppercase">
          {property.cityState}
        </p>
        <h3 className="font-display mt-2 text-2xl text-charcoal md:text-[1.6rem]">
          {property.address}
        </h3>
        {property.blurb && !compact && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
            {property.blurb}
          </p>
        )}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line-soft pt-5">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs tracking-[0.18em] text-ink-muted uppercase">
            {property.beds != null && <li>{property.beds} BD</li>}
            {property.baths != null && <li>{property.baths} BA</li>}
            {property.sqft && <li>{property.sqft} SF</li>}
          </ul>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-1 text-[11px] tracking-[0.28em] text-charcoal uppercase transition-colors hover:text-brass-deep"
            aria-label={`Inquire about ${property.address}`}
          >
            Inquire
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
