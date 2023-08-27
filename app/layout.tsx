import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title:  'Kommunaler Fahrplan Open Data',
  description:
    'Eine Übersicht zu Strategie und Umsetzungsschritten für Open Data im kommunalen Bereich.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full bg-white">
          <Layout>{children}</Layout>
      </body>
    </html>
  )
}
