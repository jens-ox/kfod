import { Gradient } from '@/components/Icon'

export function InstallationIcon({
  id,
  color
}: {
  id: string
  color?: React.ComponentProps<typeof Gradient>['color']
}) {
  return (
    <>
      <defs>
        <Gradient id={`${id}-gradient`} color={color} gradientTransform="matrix(0 21 -21 0 12 3)" />
      </defs>
      <circle cx={12} cy={12} r={12} fill={`url(#${id}-gradient)`} />
      <path
        d="m8 8 9 21 2-10 10-2L8 8Z"
        fillOpacity={0.5}
        className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
}
