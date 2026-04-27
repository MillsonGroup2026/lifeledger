'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { EXPENSE_CATEGORIES, DEFAULT_BUDGETS } from '@/lib/constants'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { ChevronDown } from 'lucide-react'

const DATE_RANGES = ['This Month', 'Last Month', 'Last 3 Months', 'YTD', 'Last 12 Months']

export default function ExpenseSummaryPage() {
  const [range, setRange] = useState('This Month')

  const categoryTotals = Object.keys(EXPENSE_CATEGORIES).map((cat) => {
    const budget = DEFAULT_BUDGETS.filter(b => b.category === cat).reduce((s, b) => s + b.monthly_amount, 0)
    const actual = 0
    return { category: cat, budget, actual, variance: actual - budget, pct: budget > 0 ? (actual / budget) * 100 : 0 }
  })

  const totalBudget = categoryTotals.reduce((s, c) => s + c.budget, 0)
  const totalActual = categoryTotals.reduce((s, c) => s + c.actual, 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Expense Summary</h1>
          <p className="text-gray-500 text-sm mt-1">Budget vs actual by category</p>
        </div>
        <div className="relative">
          <select
            value={range}
            onChange={e => setRange(e.target.value)}
            className="appearance-none bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-emerald-500"
          >
            {DATE_RANGES.map(r => <option key={r}>{r}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Budget</p>
            <p className="text-xl font-bold text-gray-300">{formatCurrency(totalBudget)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Actual Spend</p>
            <p className="text-xl font-bold text-gray-100">{formatCurrency(totalActual)}</p>
          </CardContent>
        </Card>
        <Card className={totalActual <= totalBudget ? 'border-emerald-500/30' : 'border-red-500/30'}>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Variance</p>
            <p className={`text-xl font-bold ${totalActual <= totalBudget ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatCurrency(totalBudget - totalActual)}
              <span className="text-sm ml-1 font-normal text-gray-500">
                {totalActual <= totalBudget ? 'under' : 'over'}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <Card>
          <CardHeader><CardTitle>Budget vs Actual by Category</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={categoryTotals} barGap={4}>
                <XAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => v.split('/')[0].trim().substring(0, 8)} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 8, color: '#f9fafb' }}
                  formatter={(value, name) => [formatCurrency(Number(value)), name === 'budget' ? 'Budget' : 'Actual']}
                />
                <Bar dataKey="budget" fill="#374151" radius={[3, 3, 0, 0]} name="budget" />
                <Bar dataKey="actual" radius={[3, 3, 0, 0]} name="actual">
                  {categoryTotals.map((entry) => (
                    <Cell key={entry.category} fill={entry.actual > entry.budget ? '#ef4444' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category table */}
        <Card>
          <CardHeader><CardTitle>Category Detail</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryTotals.map((row) => (
                <div key={row.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">{row.category}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-200">{formatCurrency(row.actual)}</span>
                      <span className="text-xs text-gray-500 ml-1">/ {formatCurrency(row.budget)}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, row.pct)}%`,
                        background: row.pct > 100 ? '#ef4444' : row.pct > 80 ? '#f59e0b' : '#10b981',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subcategory table */}
      <Card>
        <CardHeader><CardTitle>All Subcategories</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Category</th>
                  <th className="text-left py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Subcategory</th>
                  <th className="text-right py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Budget</th>
                  <th className="text-right py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Actual</th>
                  <th className="text-right py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Variance</th>
                </tr>
              </thead>
              <tbody>
                {DEFAULT_BUDGETS.map((b) => {
                  const actual = 0
                  const variance = actual - b.monthly_amount
                  return (
                    <tr key={`${b.category}-${b.subcategory}`} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="py-2.5 text-gray-500 text-xs">{b.category}</td>
                      <td className="py-2.5 text-gray-300">{b.subcategory}</td>
                      <td className="py-2.5 text-right text-gray-400">{formatCurrency(b.monthly_amount)}</td>
                      <td className="py-2.5 text-right text-gray-200">{formatCurrency(actual)}</td>
                      <td className={`py-2.5 text-right font-medium ${variance > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {variance > 0 ? '+' : ''}{formatCurrency(variance)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
