import { PageHero } from '../components/PageHero'
import { PropertyGrid } from '../components/PropertyGrid'
import { CtaBanner } from '../components/CtaBanner'
import { useContent } from '../hooks/contentContext'

export default function UnderContract() {
  const { underContract } = useContent()
  return (
    <>
      <PageHero
        eyebrow="Properties · Pending"
        title={
          <>
            Under <span className="font-display-italic">contract</span>
          </>
        }
        subtitle="Homes currently in contract — a snapshot of activity in the Boulder market and a sense for pace, pricing, and demand."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <PropertyGrid
            properties={underContract}
            emptyMessage="Nothing currently under contract. Browse active listings or get in touch about an upcoming search."
          />
        </div>
      </section>
      <CtaBanner
        eyebrow="Considering a sale?"
        title="Let’s price your home with precision."
        body="Pricing strategy is the single biggest lever in a sale. We’ll walk you through a comp-driven valuation and a marketing plan tailored to your home."
      />
    </>
  )
}
