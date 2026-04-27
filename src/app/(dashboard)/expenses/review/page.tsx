'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils'
import { AlertTriangle, RefreshCw, XCircle, DollarSign, HelpCircle } from 'lucide-react'

const TABS = [
  { id: 'recurring', label: 'Recurring', icon: RefreshCw, count: 12 },
  { id: 'fraud', label: 'Potential Fraud', icon: AlertTriangle, count: 2 },
  { id: 'high', label: 'High Value (>$500)', icon: DollarSign, count: 3 },
  { id: 'uncategorized', label: 'Uncategorized', icon: HelpCircle, count: 5 },
]

const RECURRING = [
  { id: '1', merchant: 'Netflix', amount: 22.99, frequency: 'Monthly', category: 'Entertainment/Activities', is_fixed: true, action_flag: 'keep' as const },
  { id: '2', merchant: 'Spotify', amount: 11.99, frequency: 'Monthly', category: 'Entertainment/Activities', is_fixed: true, action_flag: 'keep' as const },
  { id: '3', merchant: 'Adobe Creative Cloud', amount: 54.99, frequency: 'Monthly', category: 'Personal Investment (Educational)', is_fixed: false, action_flag: 'review' as const },
  { id: '4', merchant: 'NY Times', amount: 17.00, frequency: 'Monthly', category: 'Entertainment/Activities', is_fixed: false, action_flag: 'cancel' as const },
  { id: '5', merchant: 'T-Mobile', amount: 25.38, frequency: 'Monthly', category: 'Utilities', is_fixed: true, action_flag: 'keep' as const },
]

const FRAUD_FLAGS = [
  { id: '1', date: '2026-04-15', merchant: 'Unknown Vendor XZ-443', amount: 1.00, account: 'Chase Checking', reason: 'Unusual merchant name — possible probing charge' },
  { id: '2', date: '2026-04-10', merchant: 'AMZN MKTP US*2K4', amount: 299.99, account: 'Chase Checking', reason: 'Amount inconsistent with typical Amazon purchases' },
]

const HIGH_VALUE = [
  { id: '1', date: '2026-04-22', merchant: 'United Airlines', amount: 542.00, category: 'Travel & Transportation', account: 'Chase Checking', is_reviewed: false },
  { id: '2', date: '2026-04-05', merchant: 'Nordstrom', amount: 780.00, category: 'Clothing/Dry Cleaning', account: 'Chase Checking', is_reviewed: false },
  { id: '3', date: '2026-04-01', merchant: 'Car Repair Shop', amount: 1240.00, category: 'Car Maintenance', account: 'Chase Checking', is_reviewed: true },
]

export default function ExpenseReviewPage() {
  const [activeTab, setActiveTab] = useState('recurring')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Expense Review</h1>
        <p className="text-gray-500 text-sm mt-1">Recurring charges, fraud flags, and items needing attention</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-gray-800 text-gray-400 hover:text-gray-200 border border-transparent'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === id ? 'bg-emerald-500/20' : 'bg-gray-700'}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Recurring */}
      {activeTab === 'recurring' && (
        <Card>
          <CardHeader><CardTitle>Recurring Transactions</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Merchant</th>
                  <th className="text-left py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Category</th>
                  <th className="text-left py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Frequency</th>
                  <th className="text-right py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Amount</th>
                  <th className="text-center py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Fixed</th>
                  <th className="text-center py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {RECURRING.map((r) => (
                  <tr key={r.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-3 text-gray-200 font-medium">{r.merchant}</td>
                    <td className="py-3 text-gray-400 text-xs">{r.category}</td>
                    <td className="py-3 text-gray-400 text-xs">{r.frequency}</td>
                    <td className="py-3 text-right text-gray-200">{formatCurrency(r.amount, 2)}</td>
                    <td className="py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${r.is_fixed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                        {r.is_fixed ? 'Fixed' : 'Variable'}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        r.action_flag === 'keep' ? 'bg-emerald-500/10 text-emerald-400' :
                        r.action_flag === 'cancel' ? 'bg-red-500/10 text-red-400' :
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                        {r.action_flag === 'keep' ? '✓ Keep' : r.action_flag === 'cancel' ? '✕ Cancel' : '? Review'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Fraud */}
      {activeTab === 'fraud' && (
        <div className="space-y-4">
          {FRAUD_FLAGS.map((f) => (
            <Card key={f.id} className="border-red-500/30 bg-red-500/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-100">{f.merchant}</p>
                      <p className="font-bold text-red-300">{formatCurrency(f.amount, 2)}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(f.date)} · {f.account}</p>
                    <p className="text-sm text-red-300 mt-2">{f.reason}</p>
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors">
                        Flag as Fraud
                      </button>
                      <button className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors">
                        Mark as Legitimate
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* High Value */}
      {activeTab === 'high' && (
        <Card>
          <CardHeader><CardTitle>High-Value Transactions (over $500)</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {HIGH_VALUE.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-100">{t.merchant}</p>
                      {!t.is_reviewed && <span className="text-xs bg-amber-400/10 text-amber-400 px-1.5 py-0.5 rounded">Unreviewed</span>}
                      {t.is_reviewed && <span className="text-xs bg-emerald-400/10 text-emerald-400 px-1.5 py-0.5 rounded">✓ Reviewed</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(t.date)} · {t.category} · {t.account}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-300">{formatCurrency(t.amount, 2)}</p>
                    {!t.is_reviewed && (
                      <button className="text-xs text-emerald-400 hover:text-emerald-300 mt-1">Confirm category</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'uncategorized' && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No uncategorized transactions.</p>
            <p className="text-xs text-gray-600 mt-1">Connect accounts to see transactions needing category assignment.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
