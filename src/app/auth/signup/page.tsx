'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [householdName, setHouseholdName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Supabase auth + household creation
    setTimeout(() => { window.location.href = '/onboarding'; }, 500)
  }

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-emerald-400">LifeLedger</h1>
          <p className="text-gray-500 text-sm mt-2">Create your account</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-4 bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div>
            <label className="text-xs text-gray-500 block mb-1.5 font-medium">Your Name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)}
              placeholder="Noah Conner"
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5 font-medium">Household Name</label>
            <input type="text" required value={householdName} onChange={e => setHouseholdName(e.target.value)}
              placeholder="N+P Financials"
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5 font-medium">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="noah@example.com"
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5 font-medium">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold py-3 rounded-lg transition-colors text-sm">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
          <p className="text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-emerald-400 hover:text-emerald-300">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
