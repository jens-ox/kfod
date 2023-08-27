import clsx from 'clsx'
import { Check, Lightbulb, X } from 'lucide-react'

interface MarkdownIconProps {
  icon: 'check' | 'cross'
  variant?: 'good' | 'bad' | 'neutral'
}

export const MarkdownIcon = ({ icon, variant }: MarkdownIconProps) => {
  let Component = Lightbulb
  switch (icon) {
    case 'check':
      Component = Check
      break
    case 'cross':
      Component = X
      break
  }

  return (
    <span
      className={clsx(
        'inline-flex h-6 w-6 items-center justify-center rounded-full p-0.5',
        variant === 'good' && 'bg-green-100',
        variant === 'bad' && 'bg-red-100'
      )}
    >
      <Component
        className={clsx('h-4 w-4', variant === 'good' && 'text-green-900', variant === 'bad' && 'text-red-900')}
      />
    </span>
  )
}
