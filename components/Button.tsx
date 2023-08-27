import Link from 'next/link'
import clsx from 'clsx'

const baseStyles =
  'flex items-center gap-3 rounded-full px-4 py-2 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2'

const variantStyles = {
  primary:
    'bg-sky-300 font-semibold text-slate-900 hover:bg-sky-200 focus-visible:outline-sky-300/50 active:bg-sky-500',
  secondary:
    'bg-slate-800 font-medium text-white hover:bg-slate-700 focus-visible:outline-white/50 active:text-slate-400'
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (React.ComponentPropsWithoutRef<typeof Link> | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined }))

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  className = clsx(baseStyles, variantStyles[variant], className)

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
