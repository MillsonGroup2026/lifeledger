import { StatCard } from '@/components/ui/stat-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, Target, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Noah & Sarah · April 2026</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Net Worth" value={0} change={0} changeLabel="vs last quarter" size="lg" accent />
        <StatCard label="Liquid Assets" value={0} changeLabel="available within 1 week" />
        <StatCard label="Monthly Spend" value={0} change={0} changeLabel="vs budget" />
        <StatCard label="Monthly Savings" value={0} change={0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goals Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Goals Progress</CardTitle>
              <a href="/goals" className="text-xs text-emerald-400 hover:text-emerald-300">View all →</a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'House Purchase', target: 800000, current: 0, date: '2030' },
                { name: 'Car Purchase', target: 40000, current: 0, date: '2028' },
                { name: 'Emergency Fund', target: 30000, current: 20000, date: 'Ongoing' },
              ].map((goal) => {
                const pct = Math.min(100, (goal.current / goal.target) * 100)
                return (
                  <div key={goal.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300 font-medium">{goal.name}</span>
                      <span className="text-gray-500 text-xs">
                        {formatCurrency(goal.current)} / {formatCurrency(goal.target)} · {goal.date}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600">{pct.toFixed(0)}% complete</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card>
          <CardHeader>
            <CardTitle>Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Connect your accounts</p>
                  <p className="text-xs text-gray-500">Link Chase, Ally, Fidelity to sync transactions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Set income amounts</p>
                  <p className="text-xs text-gray-500">Update Sarah's current salary in Income</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Budgets pre-loaded</p>
                  <p className="text-xs text-gray-500">Categories loaded from your spreadsheet</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Snapshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {['Household/Personal', 'Personal Leisure', 'Travel & Transportation', 'Other'].map((cat) => (
          <Card key={cat}>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 mb-1 truncate">{cat}</p>
              <p className="text-lg font-bold text-gray-300">$0</p>
              <p className="text-xs text-gray-600 mt-0.5">of $0 budget</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
