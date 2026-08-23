export function EskolxMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* stem + leaf */}
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6">
        <path d="M16 10V6" />
        <path d="M16 6.5C17.6 5 20 4.6 21.8 5.4" />
      </g>
      {/* grape berries — a cluster tapering to a point */}
      <g fill="currentColor">
        <circle cx="8.8" cy="13" r="2.5" />
        <circle cx="13.6" cy="13" r="2.5" />
        <circle cx="18.4" cy="13" r="2.5" />
        <circle cx="23.2" cy="13" r="2.5" />
        <circle cx="11.2" cy="17.6" r="2.5" />
        <circle cx="16" cy="17.6" r="2.5" />
        <circle cx="20.8" cy="17.6" r="2.5" />
        <circle cx="13.6" cy="22.2" r="2.5" />
        <circle cx="18.4" cy="22.2" r="2.5" />
        <circle cx="16" cy="26.6" r="2.5" />
      </g>
    </svg>
  )
}
