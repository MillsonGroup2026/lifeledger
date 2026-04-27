import Link from 'next/link'
import { TrendingUp, Shield, Target, BarChart3, Link2, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-full bg-gray-950 text-gray-100">
      {/* Nav */}
      <nav className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-emerald-400">LifeLedger</span>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">Sign in</Link>
            <Link href="/auth/signup" className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors">
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Your complete<br />
          <span className="text-emerald-400">financial picture</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Connect all your accounts, track spending against budget, set goals with a personalized plan,
          and compare your investments against the market — all in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/signup" className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
            Start for free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium px-6 py-3 rounded-xl transition-colors">
            View demo dashboard
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: BarChart3, title: 'Balance Sheet', desc: 'Every account in one view — liquid vs. long-term, with quarterly and YOY comparisons.' },
            { icon: Target, title: 'Goals & Planning', desc: 'Set savings goals for a house, car, or retirement. Get a month-by-month plan to reach them.' },
            { icon: TrendingUp, title: 'Market Comparison', desc: "Compare investment returns vs. S&P 500, NASDAQ, and HYSA — know if your money's working hard enough." },
            { icon: Shield, title: 'Policy Analysis', desc: 'Upload insurance PDFs and let AI extract coverage details. Get recommendations for coverage gaps.' },
            { icon: Link2, title: 'Connect Accounts', desc: 'Link Chase, Ally, Fidelity, Robinhood, Coinbase, Venmo, and 12,000+ more via Plaid.' },
            { icon: BarChart3, title: 'Expense Tracking', desc: 'Budget vs. actual by category, fraud flags, recurring charge review, and high-value alerts.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-gray-100 mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8">
        <p className="text-center text-gray-600 text-sm">LifeLedger · Personal finance for real life</p>
      </footer>
    </div>
  )
}
