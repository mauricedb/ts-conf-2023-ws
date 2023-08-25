import './globals.css'

import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { SiteHeader } from '@/components/site-header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TS Congress',
  description:
    'Practice TypeScript Techniques Building React Server Components App',
  authors: [
    { name: 'Maurice de Beijer', url: 'https://www.theproblemsolver.dev' },
  ],
}

type Props = PropsWithChildren

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={cn(
          'container min-h-screen bg-background antialiased',
          inter.className,
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <Toaster />
        </div>
      </body>
    </html>
  )
}
