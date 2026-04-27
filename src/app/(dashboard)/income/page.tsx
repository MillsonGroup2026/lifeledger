import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { NP_INCOME, NP_FIXED_EXPENSES } from '@/lib/constants'

const TAX_RATE_N = 0.25
const BENEFITS_MONTHLY = 170.23 + 39.04 + 13.95

function calcNet(income: typeof NP_INCOME[0]) {
  const gross = income.annual_amount / 12
  const taxes = gross * ((income.tax_rate ?? 0) / 100)
  return gross - taxes
}

export default function IncomePage() {
  const noahGross = NP_INCOME.filter(i => i.owner === 'N').reduce((s, i) => s + i.annual_amount / 12, 0)
  const sarahGross = NP_INCOME.filter(i => i.owner === 'P').reduce((s, i) => s + i.annual_amount / 12, 0)
  const noahNet = NP_INCOME.filter(i => i.owner === 'N').reduce((s, i) => s + calcNet(i), 0)
  const sarahNet = NP_INCOME.filter(i => i.owner === 'P').reduce((s, i) => s + calcNet(i), 0)
  const totalGross = noahGross + sarahGross
  const totalNet = noahNet + sarahNet
  const totalFixed = NP_FIXED_EXPENSES.reduce((s, e) => s + e.monthly_amount, 0)
  const disposable = totalNet - totalFixed

  const incomeSection = (label: string, items: typeof NP_INCOME) => (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
      {items.map((item) => {
        const gross = item.annual_amount / 12
        const taxes = gross * ((item.tax_rate ?? 0) / 100)
        const net = gross - taxes
        return (
          <div key={item.name} className="flex items-center justify-between py-2 border-b border-gray-800/60">
            <div>
              <p className="text-sm text-gray-200">{item.name}</p>
              <p className="text-xs text-gray-500">
                {formatCurrency(item.annual_amount)}/yr · {item.tax_rate ?? 0}% tax
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-200">{formatCurrency(net, 2)}/mo</p>
              <p className="text-xs text-red-400/70">-{formatCurrency(taxes, 2)} tax</p>
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Net Income Statement</h1>
        <p className="text-gray-500 text-sm mt-1">Combined household income, deductions, and fixed expenses</p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Gross Monthly', value: totalGross },
          { label: 'Net Monthly (after tax)', value: totalNet, accent: true },
          { label: 'Fixed Expenses', value: -totalFixed },
          { label: 'Disposable Income', value: disposable, accent: disposable > 0 },
        ].map(({ label, value, accent }) => (
          <Card key={label} className={accent ? 'border-emerald-500/30 bg-emerald-500/5' : ''}>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
              <p className={`text-xl font-bold ${value < 0 ? 'text-red-400' : accent ? 'text-emerald-400' : 'text-gray-100'}`}>
                {formatCurrency(value, 2)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue */}
        <Card>
          <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {incomeSection('Noah', NP_INCOME.filter(i => i.owner === 'N'))}
            {incomeSection('Sarah', NP_INCOME.filter(i => i.owner === 'P'))}
            <div className="pt-2 flex justify-between text-sm font-semibold border-t border-gray-700">
              <span className="text-gray-300">Total Net Take-Home</span>
              <span className="text-emerald-400">{formatCurrency(totalNet, 2)}/mo</span>
            </div>
          </CardContent>
        </Card>

        {/* Fixed Expenses */}
        <Card>
          <CardHeader><CardTitle>Fixed Expenses</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {NP_FIXED_EXPENSES.map((exp) => (
                <div key={exp.name} className="flex items-center justify-between py-2 border-b border-gray-800/60">
                  <div>
                    <p className="text-sm text-gray-200">{exp.name}</p>
                    <p className="text-xs text-gray-500">{exp.category} · {exp.owner === 'joint' ? 'Joint' : exp.owner}</p>
                  </div>
                  <p className="text-sm font-semibold text-red-400">-{formatCurrency(exp.monthly_amount, 2)}</p>
                </div>
              ))}
              <div className="pt-3 flex justify-between text-sm font-semibold">
                <span className="text-gray-300">Total Fixed</span>
                <span className="text-red-400">-{formatCurrency(totalFixed, 2)}/mo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Net Summary */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Net Take-Home</p>
              <p className="text-2xl font-bold text-emerald-400">{formatCurrency(totalNet, 2)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Fixed Expenses</p>
              <p className="text-2xl font-bold text-red-400">-{formatCurrency(totalFixed, 2)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Disposable</p>
              <p className={`text-2xl font-bold ${disposable >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatCurrency(disposable, 2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
