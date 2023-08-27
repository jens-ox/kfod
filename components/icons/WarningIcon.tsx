import { Gradient } from '@/components/Icon'

export function WarningIcon({ id, color }: { id: string; color?: React.ComponentProps<typeof Gradient>['color'] }) {
  return (
    <>
      <defs>
        <Gradient id={`${id}-gradient`} color={color} gradientTransform="rotate(65.924 1.519 20.92) scale(25.7391)" />
      </defs>
      <circle cx={20} cy={20} r={12} fill={`url(#${id}-gradient)`} />
      <path
        d="M3 16c0 7.18 5.82 13 13 13s13-5.82 13-13S23.18 3 16 3 3 8.82 3 16Z"
        fillOpacity={0.5}
        className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m15.408 16.509-1.04-5.543a1.66 1.66 0 1 1 3.263 0l-1.039 5.543a.602.602 0 0 1-1.184 0Z"
        className="fill-[var(--icon-foreground)] stroke-[color:var(--icon-foreground)]"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 23a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        fillOpacity={0.5}
        stroke="currentColor"
        className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
}
