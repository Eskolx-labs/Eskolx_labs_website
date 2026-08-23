import type { SVGProps } from 'react'

type SealProps = SVGProps<SVGSVGElement> & { label?: string }

/*
 * The seal: a harvest triangle in a double-keyline die. Berries pack
 * three-two-one like a real bunch, varied in radius, touching, each with
 * an engraved crescent shine; the vine escapes the top-right as a stem
 * that coils into a tendril and opens one veined leaf. Strokes use
 * --field-ink so the die presses dark into the day spread and cream into
 * the night spread; fruit carries the wine family. Groups (die / vine /
 * fruit) are addressable so the flood can dissolve the stamp into its
 * own harvest.
 */

const BERRIES = [
  { cx: 20.5, cy: 25.5, r: 5.1 },
  { cx: 32, cy: 24.8, r: 5.4 },
  { cx: 43.5, cy: 25.5, r: 5.1 },
  { cx: 26.2, cy: 34.6, r: 5.2 },
  { cx: 37.8, cy: 34.6, r: 5.2 },
  { cx: 32, cy: 43.8, r: 5.5 },
]

export function SealMark({ className, label, ...rest }: SealProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <g className="seal-die">
        <rect x="2" y="2" width="60" height="60" rx="6" fill="none" stroke="var(--field-ink)" strokeWidth="2" opacity="0.85" />
        <rect x="5.25" y="5.25" width="53.5" height="53.5" rx="4" fill="none" stroke="var(--field-ink)" strokeWidth="0.75" opacity="0.4" />
      </g>
      <g className="seal-vine" fill="none" stroke="var(--wine-700)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 18.9 C31.3 14.2 33.2 10.4 38 7.7" strokeWidth="2.4" />
        <path d="M38 7.7 c3-1.5 6-.3 6.6 2.5 .5 2.4-1.5 4.1-3.5 3.5 -1.5-.4-2-2-1.1-3.1" strokeWidth="1.4" />
        <path d="M44.6 12.9 c4.4-2 8.3-.7 9.8 2.7 -3.3 2.3-7.5 1.1-9.8-2.7 Z" strokeWidth="1.5" />
        <path d="M45.6 13.8 c2.5-.7 5-.4 7.1 1" strokeWidth="1" opacity="0.85" />
      </g>
      <g className="seal-fruit">
        {BERRIES.map(({ cx, cy, r }, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="var(--wine-500)" />
        ))}
        {BERRIES.map(({ cx, cy, r }, i) => (
          <path
            key={`s${i}`}
            d={`M ${cx - r * 0.52} ${cy - r * 0.34} A ${r * 0.68} ${r * 0.68} 0 0 1 ${cx + r * 0.08} ${cy - r * 0.74}`}
            fill="none"
            stroke="#f0e4c8"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.45"
          />
        ))}
      </g>
    </svg>
  )
}
