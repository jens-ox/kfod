import { Gradient } from '@/components/Icon'

export function PluginsIcon({ id, color }: { id: string; color?: React.ComponentProps<typeof Gradient>['color'] }) {
  return (
    <>
      <defs>
        <Gradient id={`${id}-gradient`} color={color} gradientTransform="matrix(0 21 -21 0 20 11)" />
      </defs>
      <circle cx={20} cy={20} r={12} fill={`url(#${id}-gradient)`} />
      <g
        fillOpacity={0.5}
        className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9v14l12 6V15L3 9Z" />
        <path d="M27 9v14l-12 6V15l12-6Z" />
      </g>
      <path d="M11 4h8v2l6 3-10 6L5 9l6-3V4Z" fillOpacity={0.5} className="fill-[var(--icon-background)]" />
      <g className="stroke-[color:var(--icon-foreground)]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 5.5 27 9l-12 6L3 9l7-3.5" />
        <path d="M20 5c0 1.105-2.239 2-5 2s-5-.895-5-2m10 0c0-1.105-2.239-2-5-2s-5 .895-5 2m10 0v3c0 1.105-2.239 2-5 2s-5-.895-5-2V5" />
      </g>
    </>
  )
}
