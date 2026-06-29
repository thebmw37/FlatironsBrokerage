import type { Property } from '../data/properties'
import { PropertyCard } from './PropertyCard'

type Props = {
  properties: Property[]
  emptyMessage?: string
}

export function PropertyGrid({
  properties,
  emptyMessage = 'No properties to display at this time. Please check back soon.',
}: Props) {
  if (properties.length === 0) {
    return (
      <div className="border border-line-soft bg-paper px-8 py-16 text-center text-ink-muted">
        <p className="font-display text-xl text-charcoal">{emptyMessage}</p>
      </div>
    )
  }
  return (
    <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  )
}

export default PropertyGrid
