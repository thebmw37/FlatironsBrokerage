import { PageHero } from '../components/PageHero'
import { PropertyGrid } from '../components/PropertyGrid'
import { CtaBanner } from '../components/CtaBanner'
import { useContent } from '../hooks/contentContext'

export default function Sold() {
  const { sold } = useContent()
  return (
    <>
      <PageHero
        eyebrow="Properties · Closed"
        title={
          <>
            Recently <span className="font-display-italic">sold</span>
          </>
        }
        subtitle="A record of homes brought to close — for buyers who found their match and sellers who reached the right outcome."
      />
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <PropertyGrid
            properties={sold}
            emptyMessage="Recent closings will appear here as transactions complete."
          />
        </div>
      </section>
      <CtaBanner
        eyebrow="Ready for the next move?"
        title="Every home tells a story. Let’s talk about yours."
        body="From your first walkthrough to closing day, we’re your single point of contact — coordinating, negotiating, and translating every step."
      />
    </>
  )
}
