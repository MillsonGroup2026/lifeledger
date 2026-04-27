'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { NP_ACCOUNTS, ACCOUNT_TYPE_LABELS } from '@/lib/constants'
import { Droplets, Lock, TrendingUp, TrendingDown } from 'lucide-react'

const MARKET_BENCHMARKS = [
  { symbol: 'SPY', name: 'S&P 500', ytd: 5.2, oneYear: 12.4 },
  { symbol: 'QQQ', name: 'NASDAQ', ytd: 8.1, oneYear: 18.2 },
  { symbol: 'AGG', name: 'US Bonds', ytd: -0.8, oneYear: 1.2 },
  { symbol: 'HYSA', name: 'High-Yield Savings', ytd: 4.5, oneYear: 4.5 },
]

type TimeView = 'monthly' | 'quarterly' | 'yoy'

export default function BalanceSheetPage() {
  const [timeView, setTimeView] = useState<TimeView>('quarterly')

  const liquid = NP_ACCOUNTS.filter(a => a.is_liquid)
  const nonLiquid = NP_ACCOUNTS.filter(a => !a.is_liquid)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Balance Sheet</h1>
          <p className="text-gray-500 text-sm mt-1">All accounts, net worth, and market comparison</p>
        </div>
        <div className="flex gap-1 bg-gray-800 p-1 rounded-lg">
          {(['monthly', 'quarterly', 'yoy'] as TimeView[]).map((v) => (
            <button
              key={v}
              onClick={() => setTimeView(v)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${timeView === v ? 'bg-gray-700 text-gray-100' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {v === 'monthly' ? 'Monthly' : v === 'quarterly' ? 'Quarterly' : 'YOY'}
            </button>
          ))}
        </div>
      </div>

      {/* Net Worth Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Net Worth', value: 0, accent: true },
          { label: 'Liquid (≤1 week)', value: 0, icon: 'liquid' },
          { label: 'Investment Assets', value: 0 },
          { label: 'Credit / Debt', value: 0, negative: true },
        ].map(({ label, value, accent, negative }) => (
          <Card key={label} className={accent ? 'border-emerald-500/30 bg-emerald-500/5' : ''}>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
              <p className={`text-xl font-bold ${accent ? 'text-emerald-400' : negative ? 'text-red-400' : 'text-gray-100'}`}>
                {formatCurrency(value)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Liquid Accounts</h2>
          </div>
          {liquid.map((acct) => (
            <Card key={`${acct.institution_name}-${acct.name}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-200">{acct.institution_name}</p>
                      <span className="text-xs bg-blue-400/10 text-blue-400 px-1.5 py-0.5 rounded">
                        {ACCOUNT_TYPE_LABELS[acct.type] || acct.type}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${acct.owner === 'N' ? 'bg-violet-400/10 text-violet-400' : 'bg-pink-400/10 text-pink-400'}`}>
                        {acct.owner === 'N' ? 'Noah' : 'Sarah'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{acct.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-100">{formatCurrency(0)}</p>
                    <p className="text-xs text-gray-600">Not connected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Non-Liquid / Long-Term</h2>
          </div>
          {nonLiquid.map((acct) => (
            <Card key={`${acct.institution_name}-${acct.name}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-200">{acct.institution_name}</p>
                      <span className="text-xs bg-amber-400/10 text-amber-400 px-1.5 py-0.5 rounded">
                        {ACCOUNT_TYPE_LABELS[acct.type] || acct.type}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${acct.owner === 'N' ? 'bg-violet-400/10 text-violet-400' : 'bg-pink-400/10 text-pink-400'}`}>
                        {acct.owner === 'N' ? 'Noah' : 'Sarah'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{acct.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-100">{formatCurrency(0)}</p>
                    <p className="text-xs text-gray-600">Not connected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Market Benchmarks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Market Benchmarks</CardTitle>
            <span className="text-xs text-gray-500">Updated daily · via Alpha Vantage</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Index</th>
                  <th className="text-right py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">YTD Return</th>
                  <th className="text-right py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">1-Year Return</th>
                </tr>
              </thead>
              <tbody>
                {MARKET_BENCHMARKS.map((b) => (
                  <tr key={b.symbol} className="border-b border-gray-800/50">
                    <td className="py-3">
                      <span className="font-semibold text-gray-200">{b.symbol}</span>
                      <span className="text-gray-500 ml-2 text-xs">{b.name}</span>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`font-semibold ${b.ytd >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {formatPercent(b.ytd)}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`font-semibold ${b.oneYear >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {formatPercent(b.oneYear)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendation */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardHeader><CardTitle className="text-emerald-300">Analysis & Recommendations</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-300">
          <p>Connect your accounts via <strong className="text-white">Settings → Connect Accounts</strong> to enable personalized analysis.</p>
          <p>Once connected, we'll compare each account's return against SPY, QQQ, and typical HYSA rates and flag any underperforming allocations.</p>
          <p className="text-gray-500 text-xs">Sample: If your Robinhood brokerage is up 3.2% YTD while SPY is up 5.2%, we'll flag the 2% gap and suggest rebalancing into a low-cost index fund.</p>
        </CardContent>
      </Card>
    </div>
  )
}
