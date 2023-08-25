'use client'

import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'

type Props = PropsWithChildren

export function MainNav({ children }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasGenreParam = searchParams.has('genre')

  const menuItem = [{ label: 'Movies', href: '/movies' }, { children }]

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="inline-block font-bold">TS Congress</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {menuItem.map((item) => {
          if (item.children) {
            return item.children
          } else if (item.href) {
            const active = pathname === item.href && !hasGenreParam

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={cn('transition-colors', {
                  'text-foreground': active,
                  'text-foreground/60 hover:text-foreground/80': !active,
                })}
              >
                {item.label}
              </Link>
            )
          } else {
            return null
          }
        })}
      </nav>
    </div>
  )
}
