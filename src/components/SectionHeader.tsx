import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  body?: ReactNode
  align?: 'left' | 'center'
  variant?: 'light' | 'dark'
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = 'center',
  variant = 'light',
}: Props) {
  const isDark = variant === 'dark'
  return (
    <div
      className={`mx-auto max-w-3xl ${align === 'center' ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <p className={isDark ? 'eyebrow-light' : 'eyebrow'}>{eyebrow}</p>
      )}
      {eyebrow && align === 'center' && (
        <div className="mt-4 flex justify-center">
          <span className="inline-block h-px w-12 bg-brass" />
        </div>
      )}
      <h2
        className={`font-display mt-6 text-4xl leading-[1.1] md:text-5xl lg:text-[3.25rem] ${
          isDark ? 'text-ivory' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>
      {body && (
        <div
          className={`mt-6 text-base leading-relaxed md:text-lg ${
            isDark ? 'text-ivory/70' : 'text-ink-soft'
          }`}
        >
          {body}
        </div>
      )}
    </div>
  )
}

export default SectionHeader
