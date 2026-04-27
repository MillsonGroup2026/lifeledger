'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency, calcMonthlyContribution, monthsUntil } from '@/lib/utils'
import { Target, Plus, TrendingUp } from 'lucide-react'

const SAMPLE_GOALS = [
  { id: '1', name: 'House Purchase', category: 'house' as const, target_amount: 800000, current_amount: 20000, target_date: '2030-01-01', notes: 'Down payment + closing costs' },
  { id: '2', name: 'Car Purchase', category: 'car' as const, target_amount: 40000, current_amount: 5000, target_date: '2028-06-01', notes: 'Replacement vehicle' },
  { id: '3', name: 'Emergency Fund (6mo)', category: 'emergency' as const, target_amount: 30000, current_amount: 20000, target_date: '2027-01-01', notes: '6 months of expenses' },
]

const CATEGORY_COLORS: Record<string, string> = {
  house: 'text-blue-400 bg-blue-400/10',
  car: 'text-violet-400 bg-violet-400/10',
  emergency: 'text-amber-400 bg-amber-400/10',
  vacation: 'text-cyan-400 bg-cyan-400/10',
  retirement: 'text-emerald-400 bg-emerald-400/10',
  education: 'text-pink-400 bg-pink-400/10',
  other: 'text-gray-400 bg-gray-400/10',
}

export default function GoalsPage() {
  const [showForm, setShowForm] = useState(false)

  const totalNeeded = SAMPLE_GOALS.reduce((s, g) => s + calcMonthlyContribution(g.target_amount, g.current_amount, g.target_date), 0)
  const monthlyBudgetSurplus = 2500

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Goals & Objectives</h1>
          <p className="text-gray-500 text-sm mt-1">Track savings goals and get a plan to reach them</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Monthly Needed</p>
            <p className="text-xl font-bold text-gray-100">{formatCurrency(totalNeeded)}</p>
            <p className="text-xs text-gray-500 mt-1">across all goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Monthly Available</p>
            <p className="text-xl font-bold text-emerald-400">{formatCurrency(monthlyBudgetSurplus)}</p>
            <p className="text-xs text-gray-500 mt-1">estimated surplus</p>
          </CardContent>
        </Card>
        <Card className={totalNeeded > monthlyBudgetSurplus ? 'border-red-500/30' : 'border-emerald-500/30'}>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Gap</p>
            <p className={`text-xl font-bold ${totalNeeded > monthlyBudgetSurplus ? 'text-red-400' : 'text-emerald-400'}`}>
              {totalNeeded > monthlyBudgetSurplus
                ? `-${formatCurrency(totalNeeded - monthlyBudgetSurplus)}`
                : `+${formatCurrency(monthlyBudgetSurplus - totalNeeded)}`}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {totalNeeded > monthlyBudgetSurplus ? 'need to reduce spending' : 'surplus available'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Goals */}
      <div className="space-y-4">
        {SAMPLE_GOALS.map((goal) => {
          const pct = Math.min(100, (goal.current_amount / goal.target_amount) * 100)
          const monthly = calcMonthlyContribution(goal.target_amount, goal.current_amount, goal.target_date)
          const months = monthsUntil(goal.target_date)
          const onTrack = goal.current_amount >= (goal.target_amount - monthly * months)
          const colorClass = CATEGORY_COLORS[goal.category] || CATEGORY_COLORS.other

          return (
            <Card key={goal.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-100">{goal.name}</p>
                      <p className="text-xs text-gray-500">{goal.notes}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Target date</p>
                    <p className="text-sm font-medium text-gray-300">
                      {new Date(goal.target_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' · '}{months} months
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{formatCurrency(goal.current_amount)} saved</span>
                    <span className="text-gray-400">{formatCurrency(goal.target_amount)} goal</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: pct >= 75 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#6366f1',
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{pct.toFixed(1)}% complete · {formatCurrency(goal.target_amount - goal.current_amount)} remaining</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${onTrack ? 'text-emerald-400' : 'text-amber-400'}`} />
                    <span className={`text-xs font-medium ${onTrack ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {onTrack ? 'On track' : 'Needs attention'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-300">
                    {formatCurrency(monthly)}/mo needed
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recommendation */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader><CardTitle className="text-blue-300">AI Recommendation</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-300">
            <p>
              Based on your current goals, you need <strong className="text-white">{formatCurrency(totalNeeded)}/mo</strong> in dedicated savings.
            </p>
            <p>
              Your largest opportunity: reduce <em>Going out food/drink</em> by $200/mo ($775 → $575). This alone covers 25% of your monthly gap.
            </p>
            <p>
              For the house goal ({formatCurrency(800000)} by 2030), open a dedicated HYSA earning ~4.5% APY. At {formatCurrency(calcMonthlyContribution(800000, 20000, '2030-01-01'))}/mo you would reach your target by Dec 2029.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
