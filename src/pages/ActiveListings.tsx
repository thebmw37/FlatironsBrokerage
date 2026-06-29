import { PageHero } from '../components/PageHero'
import { PropertyGrid } from '../components/PropertyGrid'
import { CtaBanner } from '../components/CtaBanner'
import { useContent } from '../hooks/contentContext'

export default function ActiveListings() {
  const { active } = useContent()
  return (
    <>
      <PageHero
        eyebrow="Properties · Active"
        title={
          <>
            On the <span className="font-display-italic">market</span>
          </>
        }
        subtitle="A curated selection of homes currently for sale. Reach out for showings, full details, or to discuss strategy on a specific listing."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <PropertyGrid
            properties={active}
            emptyMessage="No active listings at the moment — let’s talk about what you’re searching for."
          />
        </div>
      </section>
      <CtaBanner
        eyebrow="Schedule a Showing"
        title="See a listing in person."
        body="Tell us which home caught your eye and we’ll arrange a private showing at a time that works for you."
      />
    </>
  )
}
