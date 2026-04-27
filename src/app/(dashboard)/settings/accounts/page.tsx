'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { NP_ACCOUNTS, ACCOUNT_TYPE_LABELS } from '@/lib/constants'
import { Link2, CheckCircle2, AlertCircle, Plus, ExternalLink } from 'lucide-react'

const SUPPORTED_INSTITUTIONS = [
  'Chase', 'Ally', 'Fidelity', 'Robinhood', 'Coinbase',
  'Venmo', 'First Horizon', 'Cash App', 'Apple Card',
]

export default function ConnectAccountsPage() {
  const [connecting, setConnecting] = useState(false)

  const handlePlaidConnect = () => {
    setConnecting(true)
    setTimeout(() => setConnecting(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Connect Accounts</h1>
        <p className="text-gray-500 text-sm mt-1">Link your financial accounts to sync transactions automatically</p>
      </div>

      {/* Plaid Connect */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
              <Link2 className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-100">Connect via Plaid</h3>
              <p className="text-sm text-gray-400 mt-1">
                Securely link bank, brokerage, and crypto accounts. Plaid supports 12,000+ financial institutions.
                Transactions sync automatically once connected.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {SUPPORTED_INSTITUTIONS.map(inst => (
                  <span key={inst} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{inst}</span>
                ))}
              </div>
              <button
                onClick={handlePlaidConnect}
                disabled={connecting}
                className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <Link2 className="w-4 h-4" />
                {connecting ? 'Opening Plaid...' : 'Connect a Bank Account'}
              </button>
              <p className="text-xs text-gray-600 mt-2">Currently in sandbox mode. No real credentials required for testing.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Accounts ({NP_ACCOUNTS.length})</CardTitle>
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-400 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Add Manual Account
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {NP_ACCOUNTS.map((acct) => (
              <div
                key={`${acct.institution_name}-${acct.name}-${acct.owner}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    acct.owner === 'N' ? 'bg-violet-500/20 text-violet-400' : 'bg-pink-500/20 text-pink-400'
                  }`}>
                    {acct.owner}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-200">{acct.institution_name} — {acct.name}</p>
                      <span className="text-xs text-gray-600">{ACCOUNT_TYPE_LABELS[acct.type]}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {acct.is_liquid ? '💧 Liquid' : '🔒 Non-liquid'} ·{' '}
                      {acct.owner === 'N' ? 'Noah' : 'Sarah'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-gray-600" />
                  <span className="text-xs text-gray-600">Not connected</span>
                  <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                    Connect <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manual Entry Note */}
      <Card className="border-gray-700">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Private Investments & Manual Assets</h3>
          <p className="text-sm text-gray-500">
            For private equity investments (Relativity Space, Transparent Business, etc.) and physical assets
            (cars, electronics), use the manual balance entry in the Balance Sheet page. These won't auto-sync
            but you can update valuations quarterly.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
