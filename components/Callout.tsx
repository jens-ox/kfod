import clsx from 'clsx'

import { Icon } from '@/components/Icon'

const styles = {
  note: {
    container: 'bg-sky-50',
    title: 'text-sky-900',
    body: 'text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900'
  },
  warning: {
    container: 'bg-amber-50',
    title: 'text-amber-900',
    body: 'text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-code:text-amber-900'
  }
}

const icons = {
  note: (props: { className?: string }) => <Icon icon="lightbulb" {...props} />,
  warning: (props: { className?: string }) => <Icon icon="warning" color="amber" {...props} />
}

export function Callout({
  title,
  children,
  type = 'note'
}: {
  title: string
  children: React.ReactNode
  type?: keyof typeof styles
}) {
  const IconComponent = icons[type]

  return (
    <div className={clsx('my-8 flex rounded-3xl p-6', styles[type].container)}>
      <IconComponent className="h-8 w-8 flex-none" />
      <div className="ml-4 flex-auto">
        <p className={clsx('m-0 text-lg', styles[type].title)}>{title}</p>
        <div className={clsx('prose mt-2.5', styles[type].body)}>{children}</div>
      </div>
    </div>
  )
}
