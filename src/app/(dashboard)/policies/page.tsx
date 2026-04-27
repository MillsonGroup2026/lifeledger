'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { NP_POLICIES } from '@/lib/constants'
import { Shield, Upload, Plus, Lightbulb } from 'lucide-react'

const POLICY_ICONS: Record<string, string> = {
  medical: '🏥', dental: '🦷', auto: '🚗',
  renters: '🏠', homeowners: '🏠', life: '💚',
  disability: '🛡️', umbrella: '☂️', other: '📄',
}

const RECOMMENDATIONS = [
  { type: 'umbrella', label: 'Umbrella Insurance', reason: 'You own investment assets. Umbrella liability coverage ($1–2M) costs ~$20/mo and protects against lawsuits.', priority: 'High' },
  { type: 'renters', label: 'Renters Insurance', reason: "If you're currently renting, standalone renters coverage ~$15–25/mo covers personal property.", priority: 'Medium' },
]

export default function PoliciesPage() {
  const [uploading, setUploading] = useState(false)
  const totalPremium = NP_POLICIES.reduce((s, p) => s + (p.premium_monthly ?? 0), 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Insurance Policies</h1>
          <p className="text-gray-500 text-sm mt-1">Manage coverage, upload PDFs, and get recommendations</p>
        </div>
        <div className="flex gap-2">
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium rounded-lg cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            Upload PDF
            <input type="file" accept=".pdf" className="hidden" onChange={() => setUploading(true)} />
          </label>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Add Policy
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Policies</p>
            <p className="text-xl font-bold text-gray-100">{NP_POLICIES.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Monthly Premiums</p>
            <p className="text-xl font-bold text-gray-100">{formatCurrency(totalPremium, 2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Annual Cost</p>
            <p className="text-xl font-bold text-gray-100">{formatCurrency(totalPremium * 12)}</p>
          </CardContent>
        </Card>
      </div>

      {/* PDF Upload Banner */}
      {uploading && (
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardContent className="p-4">
            <p className="text-sm text-emerald-300 font-medium">
              Claude AI is reading your PDF and extracting policy details...
            </p>
            <p className="text-xs text-gray-500 mt-1">This typically takes 10–15 seconds. Review and edit extracted fields before saving.</p>
          </CardContent>
        </Card>
      )}

      {/* Current Policies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {NP_POLICIES.map((policy) => (
          <Card key={`${policy.provider}-${policy.type}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{POLICY_ICONS[policy.type] || '📄'}</span>
                  <div>
                    <p className="font-semibold text-gray-100">{policy.provider}</p>
                    <p className="text-xs text-gray-400 capitalize">{policy.type.replace('_', ' ')} Insurance</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-200">{formatCurrency(policy.premium_monthly ?? 0, 2)}<span className="text-xs text-gray-500">/mo</span></p>
                  <p className="text-xs text-gray-500 mt-0.5">{formatCurrency((policy.premium_monthly ?? 0) * 12)}/yr</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">{policy.coverage_summary}</p>
              <div className="flex gap-2 mt-3">
                <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Edit details</button>
                <span className="text-gray-700">·</span>
                <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Upload PDF</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-amber-300">AI-Recommended Coverage Gaps</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-500 mb-4">Based on your income, assets, and current policies</p>
          <div className="space-y-4">
            {RECOMMENDATIONS.map((rec) => (
              <div key={rec.type} className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <span className="text-xl">{POLICY_ICONS[rec.type]}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-200">{rec.label}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${rec.priority === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{rec.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
