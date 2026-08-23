import type { SVGProps } from 'react'

export function SealMark({
  className,
  label,
  ...rest
}: SVGProps<SVGSVGElement> & { label?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <rect x="2" y="2" width="60" height="60" rx="6" fill="var(--vermilion)" />
      {/* carved-away rim line */}
      <rect
        x="7"
        y="7"
        width="50"
        height="50"
        rx="3"
        fill="none"
        stroke="var(--cream-100)"
        strokeWidth="1.6"
        opacity="0.9"
      />
      {/* grape cluster carved in negative */}
      <g fill="var(--cream-100)">
        <circle cx="24" cy="26" r="5" />
        <circle cx="40" cy="26" r="5" />
        <circle cx="32" cy="33" r="5" />
        <circle cx="24" cy="41" r="5" />
        <circle cx="40" cy="41" r="5" />
        <circle cx="32" cy="49" r="5" />
      </g>
      <path
        d="M32 21 C31 15 33 11 38 8"
        stroke="var(--cream-100)"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M38 8 C43 7 46 9 47 13 C43 14 39 12 38 8 Z"
        fill="var(--cream-100)"
      />
    </svg>
  )
}
