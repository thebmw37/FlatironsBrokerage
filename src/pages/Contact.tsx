import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { SITE } from '../data/site'
import { usePrimaryBroker } from '../hooks/contentContext'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const broker = usePrimaryBroker()
  const brokerName = broker?.name ?? 'Joni Renee Zalk'
  const brokerTitle = broker?.title ?? 'Real Estate Broker'
  const brokerEmail = broker?.email || SITE.contact.email
  const brokerEmailMailto = `mailto:${brokerEmail}`

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = encodeURIComponent(String(data.get('name') ?? ''))
    const email = encodeURIComponent(String(data.get('email') ?? ''))
    const phone = encodeURIComponent(String(data.get('phone') ?? ''))
    const interest = encodeURIComponent(String(data.get('interest') ?? ''))
    const message = encodeURIComponent(String(data.get('message') ?? ''))
    const subject = `New inquiry from ${decodeURIComponent(name) || 'website'}`
    const body =
      `Name: ${decodeURIComponent(name)}%0D%0A` +
      `Email: ${decodeURIComponent(email)}%0D%0A` +
      `Phone: ${decodeURIComponent(phone)}%0D%0A` +
      `I'm interested in: ${decodeURIComponent(interest)}%0D%0A%0D%0A` +
      `${decodeURIComponent(message)}`
    window.location.href = `mailto:${brokerEmail}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s <span className="font-display-italic">connect</span>.
          </>
        }
        subtitle={
          <span>
            Tell us a little about what you’re looking for. We respond
            personally — usually within a business day.
          </span>
        }
      />

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
            {/* Contact details */}
            <aside>
              <p className="eyebrow">Direct Line</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="divider-brass" />
              </div>
              <h2 className="font-display mt-6 text-3xl leading-tight text-charcoal md:text-4xl">
                {brokerName}
              </h2>
              <p className="font-display-italic mt-2 text-lg text-brass-deep">
                {brokerTitle}
              </p>

              <ul className="mt-10 space-y-7 text-sm">
                <li>
                  <p className="text-[10px] font-medium tracking-[0.32em] text-ink-muted uppercase">
                    Email
                  </p>
                  <a
                    href={brokerEmailMailto}
                    className="font-display mt-2 inline-flex items-center gap-3 text-xl text-charcoal transition-colors hover:text-brass-deep md:text-2xl"
                  >
                    <Mail className="h-5 w-5 text-brass-deep" />
                    <span className="break-all">{brokerEmail}</span>
                  </a>
                </li>
                <li>
                  <p className="text-[10px] font-medium tracking-[0.32em] text-ink-muted uppercase">
                    Service Area
                  </p>
                  <p className="font-display mt-2 inline-flex items-center gap-3 text-xl text-charcoal md:text-2xl">
                    <MapPin className="h-5 w-5 text-brass-deep" />
                    {SITE.contact.cityState} & Front Range
                  </p>
                </li>
              </ul>

              <div className="mt-12 border-l-2 border-brass pl-5">
                <p className="font-display-italic text-lg text-ink md:text-xl">
                  “We see our job as matchmaking: finding the home that fits
                  your needs and will make you happy in the long run.”
                </p>
                <p className="mt-3 text-[10px] font-medium tracking-[0.32em] text-brass-deep uppercase">
                  — Flatirons Brokerage
                </p>
              </div>
            </aside>

            {/* Form */}
            <div className="relative">
              <form
                onSubmit={handleSubmit}
                className="border border-line-soft bg-paper p-8 shadow-sm lg:p-12"
              >
                <p className="eyebrow">Inquiry Form</p>
                <h3 className="font-display mt-4 text-2xl text-charcoal md:text-3xl">
                  Start a conversation
                </h3>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <Field label="Full Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                  <Field
                    label="How we can help"
                    name="interest"
                    as="select"
                    options={[
                      'Buying a home',
                      'Selling my home',
                      'Investment property',
                      'Renovation strategy',
                      'Off-market opportunities',
                      'Just exploring',
                    ]}
                  />
                </div>

                <div className="mt-6">
                  <Field
                    label="Tell us more"
                    name="message"
                    as="textarea"
                    placeholder="Neighborhoods of interest, timeline, budget, anything we should know…"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-8 inline-flex items-center gap-2 border border-charcoal bg-charcoal px-8 py-3.5 text-[11px] font-medium tracking-[0.28em] text-ivory uppercase transition-all hover:bg-graphite hover:tracking-[0.32em]"
                >
                  Send Message
                  <Send className="h-3.5 w-3.5" />
                </button>

                {sent && (
                  <p className="mt-5 inline-flex items-center gap-2 text-sm text-brass-deep">
                    <CheckCircle2 className="h-4 w-4" />
                    Your email app should be opening — we&apos;ll reply
                    personally.
                  </p>
                )}

                <p className="mt-6 text-xs leading-relaxed text-ink-muted">
                  Submitting opens your default email client with the
                  message pre-filled. Prefer to write directly? Email{' '}
                  <a
                    href={brokerEmailMailto}
                    className="text-charcoal underline-offset-4 hover:underline"
                  >
                    {brokerEmail}
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

type FieldProps = {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  as?: 'input' | 'textarea' | 'select'
  options?: string[]
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  as = 'input',
  options = [],
}: FieldProps) {
  const baseClass =
    'mt-2 w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-base text-charcoal placeholder:text-ink-faint focus:border-charcoal focus:ring-0 focus:outline-none'

  return (
    <label className="block">
      <span className="text-[10px] font-medium tracking-[0.28em] text-ink-muted uppercase">
        {label}
        {required && <span className="text-brass-deep"> *</span>}
      </span>
      {as === 'textarea' ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={5}
          className={baseClass}
        />
      ) : as === 'select' ? (
        <select name={name} required={required} className={baseClass} defaultValue="">
          <option value="" disabled>
            Choose one…
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </label>
  )
}
