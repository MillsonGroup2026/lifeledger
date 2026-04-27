'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils'
import { EXPENSE_CATEGORIES } from '@/lib/constants'
import { Search, Filter, Download } from 'lucide-react'

const SAMPLE_TRANSACTIONS = [
  { id: '1', date: '2026-04-24', merchant_name: 'Whole Foods Market', amount: 143.22, category: 'Household/Personal', subcategory: 'Groceries', account: 'Chase Checking', is_reviewed: true, needs_review: false },
  { id: '2', date: '2026-04-22', merchant_name: 'United Airlines', amount: 542.00, category: 'Travel & Transportation', subcategory: 'Flights', account: 'Chase Checking', is_reviewed: false, needs_review: true },
  { id: '3', date: '2026-04-20', merchant_name: 'Netflix', amount: 22.99, category: 'Personal Leisure', subcategory: 'Entertainment/Activities', account: 'Chase Checking', is_reviewed: true, needs_review: false },
  { id: '4', date: '2026-04-19', merchant_name: 'Starbucks', amount: 8.45, category: 'Personal Leisure', subcategory: 'Coffee', account: 'Venmo', is_reviewed: true, needs_review: false },
  { id: '5', date: '2026-04-18', merchant_name: 'Shell Gas Station', amount: 65.30, category: 'Travel & Transportation', subcategory: 'Gas', account: 'Chase Checking', is_reviewed: true, needs_review: false },
]

const ALL_CATEGORIES = Object.keys(EXPENSE_CATEGORIES)

export default function ExpenseDetailPage() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [acctFilter, setAcctFilter] = useState('All')

  const filtered = SAMPLE_TRANSACTIONS.filter((t) => {
    const matchSearch = !search || t.merchant_name.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'All' || t.category === catFilter
    const matchAcct = acctFilter === 'All' || t.account === acctFilter
    return matchSearch && matchCat && matchAcct
  })

  const total = filtered.reduce((s, t) => s + t.amount, 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Expense Detail</h1>
          <p className="text-gray-500 text-sm mt-1">Every transaction with full filtering</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search merchants..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 text-sm rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>
        <select
          value={catFilter}
          onChange={e => setCatFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
        >
          <option>All</option>
          {ALL_CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select
          value={acctFilter}
          onChange={e => setAcctFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
        >
          <option>All</option>
          <option>Chase Checking</option>
          <option>Ally Savings</option>
          <option>Venmo</option>
          <option>Cash App</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{filtered.length} transactions</CardTitle>
            <span className="text-sm font-semibold text-gray-300">Total: {formatCurrency(total)}</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">Merchant</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">Account</th>
                  <th className="text-right px-5 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">Amount</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 group">
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{formatDate(t.date)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-200 font-medium">{t.merchant_name}</span>
                        {t.needs_review && (
                          <span className="text-xs bg-amber-400/10 text-amber-400 px-1.5 py-0.5 rounded">Review</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{t.subcategory}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">{t.category}</td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">{t.account}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-gray-200">{formatCurrency(t.amount, 2)}</td>
                    <td className="px-5 py-3.5">
                      <button className="text-xs text-gray-600 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              <p>No transactions found.</p>
              <p className="text-xs mt-1">Connect your accounts to see live data.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
