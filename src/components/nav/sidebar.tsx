'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Target, TrendingUp, PieChart, List,
  AlertCircle, BarChart3, Shield, Sliders, Link2, LogOut
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/goals', label: 'Goals & Objectives', icon: Target },
  { href: '/income', label: 'Net Income', icon: TrendingUp },
  { href: '/expenses/summary', label: 'Expense Summary', icon: PieChart },
  { href: '/expenses/detail', label: 'Expense Detail', icon: List },
  { href: '/expenses/review', label: 'Expense Review', icon: AlertCircle },
  { href: '/balance-sheet', label: 'Balance Sheet', icon: BarChart3 },
  { href: '/policies', label: 'Policies', icon: Shield },
]

const SETTINGS_ITEMS = [
  { href: '/settings/budget', label: 'Budget & Categories', icon: Sliders },
  { href: '/settings/accounts', label: 'Connect Accounts', icon: Link2 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-gray-900 border-r border-gray-800 flex flex-col z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <span className="text-xl font-bold text-emerald-400">LifeLedger</span>
        <span className="ml-2 text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">N+P</span>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === href || pathname.startsWith(href + '/')
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}

        <div className="pt-4 pb-1 px-3">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Settings</p>
        </div>

        {SETTINGS_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-gray-800">
        <Link
          href="/auth/logout"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </Link>
      </div>
    </aside>
  )
}
