type Props = { className?: string }

export function Monogram({ className }: Props) {
  return (
    <svg
      viewBox="0 0 56 56"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <circle cx="28" cy="28" r="26" />
      <path d="M14 38 L28 18 L42 38 Z" strokeLinejoin="round" />
      <path d="M14 38 L42 38" strokeLinecap="round" />
      <path d="M22 32 L34 32" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}
