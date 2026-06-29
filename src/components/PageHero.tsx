import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  children?: ReactNode
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  children,
}: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line-soft bg-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-stone/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brass/10 blur-3xl"
      />
      <div
        className={`relative mx-auto max-w-5xl px-6 py-24 lg:px-10 lg:py-32 ${
          align === 'center' ? 'text-center' : ''
        }`}
      >
        {eyebrow && (
          <p className="eyebrow animate-fade-up">
            {eyebrow}
          </p>
        )}
        {eyebrow && align === 'center' && (
          <div className="animate-fade-up mt-4 flex justify-center">
            <span className="divider-brass" />
          </div>
        )}
        <h1 className="font-display animate-fade-up mt-6 text-5xl leading-[1.05] text-charcoal md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <div
            className={`animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft ${
              align === 'center' ? 'mx-auto' : ''
            }`}
          >
            {subtitle}
          </div>
        )}
        {children && <div className="mt-10 animate-fade-up">{children}</div>}
      </div>
    </section>
  )
}

export default PageHero
