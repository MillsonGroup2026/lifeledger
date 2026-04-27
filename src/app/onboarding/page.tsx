'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const STEPS = [
  { id: 1, title: 'Personal Basics', desc: 'Tell us about yourself' },
  { id: 2, title: 'Financial Background', desc: 'Your income and financial situation' },
  { id: 3, title: 'Health & Insurance', desc: 'For policy recommendations' },
  { id: 4, title: 'Goals & Lifestyle', desc: 'Your financial objectives' },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    age: '', location: '', marital_status: 'married', dependents: '0', employment_type: 'both',
    financial_literacy: 'intermediate', income_range: '150k-200k', primary_income_source: 'salary', debt_types: [] as string[], credit_score_range: '740-799',
    general_health: 'good', is_smoker: false, has_employer_insurance: false, health_risk_tolerance: 'low',
    primary_financial_goal: 'build_wealth', investment_risk_appetite: 'moderate', time_horizon_years: '10',
  })

  const set = (key: string, value: string | boolean | string[]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const progress = ((step - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-950 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-emerald-400">LifeLedger</h1>
          <p className="text-gray-500 text-sm mt-1">Let's personalize your experience</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((s) => (
              <div key={s.id} className={`flex-1 text-center ${step >= s.id ? 'text-emerald-400' : 'text-gray-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-1 ${step >= s.id ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-600'}`}>
                  {s.id}
                </div>
                <p className="text-xs hidden sm:block">{s.title}</p>
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-gray-100 mb-1">{STEPS[step - 1].title}</h2>
          <p className="text-sm text-gray-500 mb-6">{STEPS[step - 1].desc}</p>

          {/* Step 1: Personal */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Age</label>
                  <input type="number" value={form.age} onChange={e => set('age', e.target.value)} placeholder="32"
                    className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Location</label>
                  <input type="text" value={form.location} onChange={e => set('location', e.target.value)} placeholder="Dallas, TX"
                    className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Marital Status</label>
                <select value={form.marital_status} onChange={e => set('marital_status', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500">
                  <option value="single">Single</option>
                  <option value="married">Married / Partnered</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Dependents</label>
                  <select value={form.dependents} onChange={e => set('dependents', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500">
                    {['0','1','2','3','4+'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Employment Type</label>
                  <select value={form.employment_type} onChange={e => set('employment_type', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500">
                    <option value="w2">W-2 Employee</option>
                    <option value="self_employed">Self-Employed</option>
                    <option value="both">Both</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Financial Literacy</label>
                <select value={form.financial_literacy} onChange={e => set('financial_literacy', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500">
                  <option value="beginner">Beginner — I know the basics</option>
                  <option value="intermediate">Intermediate — I manage my own investments</option>
                  <option value="advanced">Advanced — I actively manage a portfolio</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Household Income Range</label>
                <select value={form.income_range} onChange={e => set('income_range', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500">
                  <option value="under-50k">Under $50K</option>
                  <option value="50k-100k">$50K–$100K</option>
                  <option value="100k-150k">$100K–$150K</option>
                  <option value="150k-200k">$150K–$200K</option>
                  <option value="200k-300k">$200K–$300K</option>
                  <option value="300k+">$300K+</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Credit Score Range</label>
                <select value={form.credit_score_range} onChange={e => set('credit_score_range', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500">
                  <option value="under-580">Below 580 (Poor)</option>
                  <option value="580-669">580–669 (Fair)</option>
                  <option value="670-739">670–739 (Good)</option>
                  <option value="740-799">740–799 (Very Good)</option>
                  <option value="800+">800+ (Exceptional)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-2">Current Debt Types (select all that apply)</label>
                <div className="grid grid-cols-2 gap-2">
                  {['mortgage', 'student_loans', 'car_loan', 'credit_cards', 'medical', 'none'].map((d) => (
                    <label key={d} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                      <input type="checkbox" className="rounded"
                        checked={form.debt_types.includes(d)}
                        onChange={e => {
                          const next = e.target.checked
                            ? [...form.debt_types, d]
                            : form.debt_types.filter(x => x !== d)
                          set('debt_types', next)
                        }} />
                      {d.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Health */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">General Health</label>
                <select value={form.general_health} onChange={e => set('general_health', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500">
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor / Chronic conditions</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="smoker" checked={form.is_smoker} onChange={e => set('is_smoker', e.target.checked)}
                  className="w-4 h-4" />
                <label htmlFor="smoker" className="text-sm text-gray-300">Current smoker / tobacco user</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="employer_ins" checked={form.has_employer_insurance} onChange={e => set('has_employer_insurance', e.target.checked)}
                  className="w-4 h-4" />
                <label htmlFor="employer_ins" className="text-sm text-gray-300">I have employer-provided health insurance</label>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Risk Tolerance for Coverage Gaps</label>
                <select value={form.health_risk_tolerance} onChange={e => set('health_risk_tolerance', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500">
                  <option value="low">Low — I want comprehensive coverage</option>
                  <option value="medium">Medium — Balanced coverage and cost</option>
                  <option value="high">High — Minimal coverage, lower premiums</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Goals */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Primary Financial Goal</label>
                <select value={form.primary_financial_goal} onChange={e => set('primary_financial_goal', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500">
                  <option value="buy_home">Buy a home</option>
                  <option value="retire_early">Retire early</option>
                  <option value="build_wealth">Build long-term wealth</option>
                  <option value="pay_off_debt">Pay off debt</option>
                  <option value="emergency_fund">Build emergency fund</option>
                  <option value="kids_education">Save for kids' education</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Investment Risk Appetite</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'conservative', label: 'Conservative', desc: 'Bonds, CDs, savings' },
                    { value: 'moderate', label: 'Moderate', desc: 'Mix of stocks & bonds' },
                    { value: 'aggressive', label: 'Aggressive', desc: 'Growth stocks, crypto' },
                  ].map(({ value, label, desc }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => set('investment_risk_appetite', value)}
                      className={`p-3 rounded-lg border text-left transition-colors ${form.investment_risk_appetite === value ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}
                    >
                      <p className="text-sm font-medium text-gray-200">{label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Investment Time Horizon</label>
                <select value={form.time_horizon_years} onChange={e => set('time_horizon_years', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500">
                  <option value="1">Less than 1 year</option>
                  <option value="3">1–3 years</option>
                  <option value="5">3–5 years</option>
                  <option value="10">5–10 years</option>
                  <option value="20">10–20 years</option>
                  <option value="30">20+ years (retirement)</option>
                </select>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}
            <button
              onClick={() => {
                if (step < STEPS.length) setStep(s => s + 1)
                else window.location.href = '/dashboard'
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold rounded-lg transition-colors"
            >
              {step < STEPS.length ? 'Continue' : 'Go to Dashboard'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-4">
          Step {step} of {STEPS.length} · You can update these anytime in Settings
        </p>
      </div>
    </div>
  )
}
