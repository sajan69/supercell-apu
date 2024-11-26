'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isClashOfClans = pathname?.startsWith('/clash-of-clans')
  const isClashRoyale = pathname?.startsWith('/clash-royale')

  const navItems = [
    { href: '/', label: 'Home' },
    ...(isClashOfClans
      ? [
          { href: '/clash-of-clans', label: 'CoC Dashboard' },
          { href: '/clash-of-clans/players', label: 'Players' },
          { href: '/clash-of-clans/clans', label: 'Clans' },
          { href: '/clash-of-clans/wars', label: 'Wars' },
        ]
      : []),
    ...(isClashRoyale
      ? [
          { href: '/clash-royale', label: 'CR Dashboard' },
          { href: '/clash-royale/players', label: 'Players' },
          { href: '/clash-royale/clans', label: 'Clans' },
          { href: '/clash-royale/wars', label: 'Wars' },
          { href: '/clash-royale/tournaments', label: 'Tournaments' },
        ]
      : []),
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Clash Dashboard
            </Link>
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm ${
                    pathname === item.href
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <nav className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${
                  pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-800 shadow-md mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
          © 2023 Clash Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

