import { Gradient } from '@/components/Icon'

export function PresetsIcon({ id, color }: { id: string; color?: React.ComponentProps<typeof Gradient>['color'] }) {
  return (
    <>
      <defs>
        <Gradient id={`${id}-gradient`} color={color} gradientTransform="matrix(0 21 -21 0 20 3)" />
      </defs>
      <circle cx={20} cy={12} r={12} fill={`url(#${id}-gradient)`} />
      <g
        className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
        fillOpacity={0.5}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 5v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z" />
        <path d="M18 17v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V17a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2Z" />
        <path d="M18 5v4a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2Z" />
        <path d="M3 25v2a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z" />
      </g>
    </>
  )
}
