/**
 * Seed script: populates N+P household with accounts, budgets, income, fixed expenses, and policies.
 * Run after creating the N+P user account via the signup page:
 *   npx ts-node --project tsconfig.seed.json seed/seed.ts <household_id>
 */

import { createClient } from '@supabase/supabase-js'
import { NP_ACCOUNTS, NP_INCOME, NP_FIXED_EXPENSES, NP_POLICIES, DEFAULT_BUDGETS } from '../src/lib/constants'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed(householdId: string) {
  console.log(`Seeding household: ${householdId}`)

  // Accounts
  const accounts = NP_ACCOUNTS.map(a => ({ ...a, household_id: householdId, is_active: true }))
  const { error: accErr } = await supabase.from('accounts').upsert(accounts, { ignoreDuplicates: true })
  if (accErr) console.error('accounts:', accErr.message)
  else console.log(`✓ ${accounts.length} accounts`)

  // Budgets
  const budgets = DEFAULT_BUDGETS.map(b => ({ ...b, household_id: householdId, person: 'joint' }))
  const { error: budErr } = await supabase.from('budgets').upsert(budgets, { onConflict: 'household_id,category,subcategory,person' })
  if (budErr) console.error('budgets:', budErr.message)
  else console.log(`✓ ${budgets.length} budgets`)

  // Income items
  const income = NP_INCOME.map(i => ({ ...i, household_id: householdId, is_active: true }))
  const { error: incErr } = await supabase.from('income_items').upsert(income, { ignoreDuplicates: true })
  if (incErr) console.error('income:', incErr.message)
  else console.log(`✓ ${income.length} income items`)

  // Fixed expenses
  const expenses = NP_FIXED_EXPENSES.map(e => ({ ...e, household_id: householdId, is_active: true }))
  const { error: expErr } = await supabase.from('fixed_expenses').upsert(expenses, { ignoreDuplicates: true })
  if (expErr) console.error('fixed_expenses:', expErr.message)
  else console.log(`✓ ${expenses.length} fixed expenses`)

  // Policies
  const policies = NP_POLICIES.map(p => ({ ...p, household_id: householdId }))
  const { error: polErr } = await supabase.from('policies').upsert(policies, { ignoreDuplicates: true })
  if (polErr) console.error('policies:', polErr.message)
  else console.log(`✓ ${policies.length} policies`)

  console.log('\nSeed complete.')
}

const householdId = process.argv[2]
if (!householdId) {
  console.error('Usage: npx ts-node seed/seed.ts <household_id>')
  process.exit(1)
}

seed(householdId).catch(console.error)
