'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { DEFAULT_BUDGETS, EXPENSE_CATEGORIES } from '@/lib/constants'
import { Save, Plus } from 'lucide-react'

type BudgetItem = { category: string; subcategory: string; monthly_amount: number }

export default function BudgetSettingsPage() {
  const [budgets, setBudgets] = useState<BudgetItem[]>(DEFAULT_BUDGETS)
  const [saved, setSaved] = useState(false)

  const update = (idx: number, amount: number) => {
    setBudgets(prev => prev.map((b, i) => i === idx ? { ...b, monthly_amount: amount } : b))
    setSaved(false)
  }

  const total = budgets.reduce((s, b) => s + b.monthly_amount, 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Budget & Categorization</h1>
          <p className="text-gray-500 text-sm mt-1">Adjust monthly budgets and manage expense categories</p>
        </div>
        <button
          onClick={() => setSaved(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>

      <Card>
        <CardContent className="p-4 flex items-center justify-between bg-emerald-500/5 border-emerald-500/20">
          <p className="text-sm text-gray-300">Total monthly variable budget</p>
          <p className="text-xl font-bold text-emerald-400">{formatCurrency(total)}</p>
        </CardContent>
      </Card>

      {Object.keys(EXPENSE_CATEGORIES).map((cat) => {
        const catBudgets = budgets.map((b, i) => ({ ...b, idx: i })).filter(b => b.category === cat)
        const catTotal = catBudgets.reduce((s, b) => s + b.monthly_amount, 0)
        return (
          <Card key={cat}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{cat}</CardTitle>
                <span className="text-sm text-gray-400">{formatCurrency(catTotal)}/mo total</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {catBudgets.map(({ subcategory, monthly_amount, idx }) => (
                  <div key={subcategory} className="flex items-center justify-between">
                    <label className="text-sm text-gray-300">{subcategory}</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm">$</span>
                      <input
                        type="number"
                        value={monthly_amount}
                        onChange={e => update(idx, parseFloat(e.target.value) || 0)}
                        className="w-24 bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-1.5 text-right focus:outline-none focus:border-emerald-500"
                      />
                      <span className="text-gray-500 text-xs w-6">/mo</span>
                    </div>
                  </div>
                ))}
                <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-emerald-400 transition-colors mt-2">
                  <Plus className="w-3.5 h-3.5" />
                  Add subcategory
                </button>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Offline cash transactions */}
      <Card>
        <CardHeader><CardTitle>Add Offline / Cash Transaction</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Date</label>
              <input type="date" className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Merchant</label>
              <input type="text" placeholder="e.g. Farmers Market" className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 placeholder-gray-600" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Amount</label>
              <input type="number" placeholder="0.00" className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 placeholder-gray-600" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Category</label>
              <select className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500">
                {Object.keys(EXPENSE_CATEGORIES).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
