export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type AccountType =
  | 'checking' | 'savings' | 'brokerage' | 'crypto'
  | '401k' | 'roth_401k' | 'roth_ira' | 'ira'
  | 'life_insurance' | 'disability' | 'espp'
  | 'credit_card' | 'car_loan'
  | 'private_equity' | 'asset'

export type PersonType = 'N' | 'P' | 'joint'
export type GoalCategory = 'house' | 'car' | 'vacation' | 'emergency' | 'retirement' | 'education' | 'other'
export type PolicyType = 'medical' | 'dental' | 'auto' | 'renters' | 'homeowners' | 'life' | 'disability' | 'umbrella' | 'other'
export type RiskAppetite = 'conservative' | 'moderate' | 'aggressive'
export type EmploymentType = 'w2' | 'self_employed' | 'both' | 'other'
export type FinancialLiteracy = 'beginner' | 'intermediate' | 'advanced'

export interface Database {
  public: {
    Tables: {
      households: {
        Row: { id: string; name: string; created_at: string }
        Insert: { id?: string; name: string; created_at?: string }
        Update: { id?: string; name?: string }
      }
      household_members: {
        Row: { id: string; user_id: string; household_id: string; role: 'owner' | 'member'; nickname: string | null; created_at: string }
        Insert: { id?: string; user_id: string; household_id: string; role?: 'owner' | 'member'; nickname?: string | null }
        Update: { role?: 'owner' | 'member'; nickname?: string | null }
      }
      user_profiles: {
        Row: {
          id: string; user_id: string; household_id: string
          age: number | null; location: string | null
          marital_status: string | null; dependents: number | null
          employment_type: EmploymentType | null
          financial_literacy: FinancialLiteracy | null
          income_range: string | null
          primary_income_source: string | null
          debt_types: string[] | null
          credit_score_range: string | null
          general_health: string | null
          is_smoker: boolean | null
          has_employer_insurance: boolean | null
          health_risk_tolerance: string | null
          primary_financial_goal: string | null
          investment_risk_appetite: RiskAppetite | null
          time_horizon_years: number | null
          created_at: string; updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_profiles']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string }
        Update: Partial<Omit<Database['public']['Tables']['user_profiles']['Row'], 'id' | 'user_id' | 'household_id' | 'created_at'>>
      }
      accounts: {
        Row: {
          id: string; household_id: string
          plaid_item_id: string | null; plaid_account_id: string | null
          institution_name: string; name: string
          type: AccountType; owner: PersonType
          is_liquid: boolean; is_active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['accounts']['Row'], 'id' | 'created_at'> & { id?: string }
        Update: Partial<Omit<Database['public']['Tables']['accounts']['Row'], 'id' | 'household_id' | 'created_at'>>
      }
      transactions: {
        Row: {
          id: string; account_id: string
          plaid_transaction_id: string | null
          date: string; amount: number
          merchant_name: string | null
          category: string | null; subcategory: string | null
          is_recurring: boolean; is_fixed: boolean
          is_reviewed: boolean; needs_review: boolean
          manual_note: string | null; created_at: string
        }
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at'> & { id?: string }
        Update: Partial<Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'account_id' | 'created_at'>>
      }
      balance_snapshots: {
        Row: { id: string; account_id: string; snapshot_date: string; balance: number; contributions_mtd: number; created_at: string }
        Insert: Omit<Database['public']['Tables']['balance_snapshots']['Row'], 'id' | 'created_at'> & { id?: string }
        Update: Partial<Pick<Database['public']['Tables']['balance_snapshots']['Row'], 'balance' | 'contributions_mtd'>>
      }
      budgets: {
        Row: { id: string; household_id: string; category: string; subcategory: string; person: PersonType; monthly_amount: number; updated_at: string }
        Insert: Omit<Database['public']['Tables']['budgets']['Row'], 'id' | 'updated_at'> & { id?: string }
        Update: { monthly_amount?: number }
      }
      goals: {
        Row: {
          id: string; household_id: string; name: string
          category: GoalCategory; target_amount: number
          current_amount: number; target_date: string
          monthly_contribution_needed: number | null
          notes: string | null; created_at: string
        }
        Insert: Omit<Database['public']['Tables']['goals']['Row'], 'id' | 'created_at'> & { id?: string }
        Update: Partial<Omit<Database['public']['Tables']['goals']['Row'], 'id' | 'household_id' | 'created_at'>>
      }
      policies: {
        Row: {
          id: string; household_id: string
          provider: string; type: PolicyType
          premium_monthly: number | null
          coverage_summary: string | null
          renewal_date: string | null
          notes: string | null; created_at: string
        }
        Insert: Omit<Database['public']['Tables']['policies']['Row'], 'id' | 'created_at'> & { id?: string }
        Update: Partial<Omit<Database['public']['Tables']['policies']['Row'], 'id' | 'household_id' | 'created_at'>>
      }
      recurring_transactions: {
        Row: {
          id: string; household_id: string
          merchant_name: string; category: string | null
          avg_amount: number; frequency: string
          is_fixed: boolean; last_seen: string
          action_flag: 'keep' | 'cancel' | 'review'
        }
        Insert: Omit<Database['public']['Tables']['recurring_transactions']['Row'], 'id'> & { id?: string }
        Update: Partial<Omit<Database['public']['Tables']['recurring_transactions']['Row'], 'id' | 'household_id'>>
      }
      market_snapshots: {
        Row: { id: string; symbol: string; date: string; close_price: number; ytd_return: number | null; created_at: string }
        Insert: Omit<Database['public']['Tables']['market_snapshots']['Row'], 'id' | 'created_at'> & { id?: string }
        Update: { close_price?: number; ytd_return?: number | null }
      }
      income_items: {
        Row: {
          id: string; household_id: string; name: string
          owner: PersonType; type: 'salary' | 'distribution' | 'bonus' | 'other'
          annual_amount: number; tax_rate: number | null
          notes: string | null; is_active: boolean; updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['income_items']['Row'], 'id' | 'updated_at'> & { id?: string }
        Update: Partial<Omit<Database['public']['Tables']['income_items']['Row'], 'id' | 'household_id' | 'updated_at'>>
      }
      fixed_expenses: {
        Row: {
          id: string; household_id: string; name: string
          category: string; monthly_amount: number
          owner: PersonType; is_active: boolean; updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['fixed_expenses']['Row'], 'id' | 'updated_at'> & { id?: string }
        Update: Partial<Omit<Database['public']['Tables']['fixed_expenses']['Row'], 'id' | 'household_id' | 'updated_at'>>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
