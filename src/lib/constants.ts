export const EXPENSE_CATEGORIES = {
  'Household/Personal': [
    'Groceries', 'Hair', 'Makeup', 'Other Beauty/Personal Care',
    'Prescriptions', 'Clothing/Dry Cleaning', 'Health & Wellness',
    'Household Items', 'Personal Investment (Educational)',
  ],
  'Personal Leisure': [
    'Going out food/drink', 'Entertainment/Activities', 'Coffee', 'Gambling',
  ],
  'Travel & Transportation': [
    'Flights', 'Hotels/Airbnb', 'Activities', 'Gas',
    'Uber/Lyft/Public Trans/Parking', 'Car Maintenance',
  ],
  'Other': [
    'Friends/Family Gifts', 'Charitable Donations', 'Discretionary',
  ],
} as const

export type ExpenseCategory = keyof typeof EXPENSE_CATEGORIES

export const DEFAULT_BUDGETS: Array<{ category: string; subcategory: string; monthly_amount: number }> = [
  { category: 'Household/Personal', subcategory: 'Groceries', monthly_amount: 640 },
  { category: 'Household/Personal', subcategory: 'Hair', monthly_amount: 130 },
  { category: 'Household/Personal', subcategory: 'Makeup', monthly_amount: 50 },
  { category: 'Household/Personal', subcategory: 'Other Beauty/Personal Care', monthly_amount: 87.5 },
  { category: 'Household/Personal', subcategory: 'Prescriptions', monthly_amount: 40 },
  { category: 'Household/Personal', subcategory: 'Clothing/Dry Cleaning', monthly_amount: 70 },
  { category: 'Household/Personal', subcategory: 'Health & Wellness', monthly_amount: 100 },
  { category: 'Household/Personal', subcategory: 'Household Items', monthly_amount: 100 },
  { category: 'Household/Personal', subcategory: 'Personal Investment (Educational)', monthly_amount: 40 },
  { category: 'Personal Leisure', subcategory: 'Going out food/drink', monthly_amount: 775 },
  { category: 'Personal Leisure', subcategory: 'Entertainment/Activities', monthly_amount: 300 },
  { category: 'Personal Leisure', subcategory: 'Coffee', monthly_amount: 15 },
  { category: 'Personal Leisure', subcategory: 'Gambling', monthly_amount: 500 },
  { category: 'Travel & Transportation', subcategory: 'Flights', monthly_amount: 400 },
  { category: 'Travel & Transportation', subcategory: 'Hotels/Airbnb', monthly_amount: 250 },
  { category: 'Travel & Transportation', subcategory: 'Activities', monthly_amount: 250 },
  { category: 'Travel & Transportation', subcategory: 'Gas', monthly_amount: 110 },
  { category: 'Travel & Transportation', subcategory: 'Uber/Lyft/Public Trans/Parking', monthly_amount: 110 },
  { category: 'Travel & Transportation', subcategory: 'Car Maintenance', monthly_amount: 120 },
  { category: 'Other', subcategory: 'Friends/Family Gifts', monthly_amount: 500 },
  { category: 'Other', subcategory: 'Charitable Donations', monthly_amount: 70 },
  { category: 'Other', subcategory: 'Discretionary', monthly_amount: 200 },
]

export const NP_ACCOUNTS = [
  { institution_name: 'Chase', name: 'Checking', type: 'checking' as const, owner: 'N' as const, is_liquid: true },
  { institution_name: 'Ally', name: 'Savings', type: 'savings' as const, owner: 'N' as const, is_liquid: true },
  { institution_name: 'Coinbase', name: 'Crypto', type: 'crypto' as const, owner: 'N' as const, is_liquid: true },
  { institution_name: 'NWM', name: 'Brokerage', type: 'brokerage' as const, owner: 'N' as const, is_liquid: false },
  { institution_name: 'NWM', name: 'Variable Life Insurance', type: 'life_insurance' as const, owner: 'N' as const, is_liquid: false },
  { institution_name: 'NWM', name: 'Disability Insurance', type: 'disability' as const, owner: 'N' as const, is_liquid: false },
  { institution_name: 'Smith+Nephew', name: 'ESPP', type: 'espp' as const, owner: 'N' as const, is_liquid: false },
  { institution_name: 'Fidelity', name: 'Roth 401K', type: 'roth_401k' as const, owner: 'N' as const, is_liquid: false },
  { institution_name: 'Relativity Space', name: 'Private Equity (Series A)', type: 'private_equity' as const, owner: 'N' as const, is_liquid: false },
  { institution_name: 'Transparent Business', name: 'Private Equity (Round 3d)', type: 'private_equity' as const, owner: 'N' as const, is_liquid: false },
  { institution_name: 'Miso Robotics', name: 'Private Equity (Series D)', type: 'private_equity' as const, owner: 'N' as const, is_liquid: false },
  { institution_name: 'Cortex', name: 'Private Equity', type: 'private_equity' as const, owner: 'N' as const, is_liquid: false },
  { institution_name: 'Cash App', name: 'Cash Balance', type: 'checking' as const, owner: 'N' as const, is_liquid: true },
  { institution_name: 'Venmo', name: 'Balance', type: 'checking' as const, owner: 'N' as const, is_liquid: true },
  { institution_name: 'Chase', name: 'Credit Card', type: 'credit_card' as const, owner: 'P' as const, is_liquid: false },
  { institution_name: 'Fidelity', name: 'Roth 401K', type: 'roth_401k' as const, owner: 'P' as const, is_liquid: false },
  { institution_name: 'Smith+Nephew', name: 'ESPP', type: 'espp' as const, owner: 'P' as const, is_liquid: false },
  { institution_name: 'Robinhood', name: 'Brokerage', type: 'brokerage' as const, owner: 'P' as const, is_liquid: true },
  { institution_name: 'Robinhood', name: 'Crypto', type: 'crypto' as const, owner: 'P' as const, is_liquid: true },
  { institution_name: 'Ally', name: 'Savings', type: 'savings' as const, owner: 'P' as const, is_liquid: true },
  { institution_name: 'First Horizon', name: 'Checking', type: 'checking' as const, owner: 'P' as const, is_liquid: true },
  { institution_name: 'NWM', name: 'Life Insurance', type: 'life_insurance' as const, owner: 'P' as const, is_liquid: false },
  { institution_name: 'Venmo', name: 'Balance', type: 'checking' as const, owner: 'P' as const, is_liquid: true },
]

export const NP_INCOME = [
  { name: 'Millson Group Salary', owner: 'N' as const, type: 'salary' as const, annual_amount: 150000, tax_rate: 25 },
  { name: 'Millson Group Distribution', owner: 'N' as const, type: 'distribution' as const, annual_amount: 0, tax_rate: 20 },
  { name: 'Smith+Nephew Salary', owner: 'P' as const, type: 'salary' as const, annual_amount: 0, tax_rate: 22 },
]

export const NP_FIXED_EXPENSES = [
  { name: 'Allstate Medical Insurance', category: 'Insurance', monthly_amount: 170.23, owner: 'joint' as const },
  { name: 'Ameritas Dental Insurance', category: 'Insurance', monthly_amount: 39.04, owner: 'joint' as const },
  { name: 'USAA/State Farm Car & Renters', category: 'Insurance', monthly_amount: 13.95, owner: 'joint' as const },
  { name: 'Toyota Car Payment', category: 'Transportation', monthly_amount: 336.45, owner: 'joint' as const },
  { name: 'T-Mobile Phone Bill', category: 'Utilities', monthly_amount: 25.38, owner: 'joint' as const },
  { name: 'NWM Variable Life Insurance Premium', category: 'Insurance', monthly_amount: 364.07, owner: 'N' as const },
  { name: 'NWM Disability Insurance Premium', category: 'Insurance', monthly_amount: 53.80, owner: 'N' as const },
  { name: 'Ally Savings Contribution', category: 'Savings', monthly_amount: 250, owner: 'joint' as const },
  { name: 'NWM Brokerage Contribution', category: 'Savings', monthly_amount: 533.33, owner: 'N' as const },
  { name: 'Roth 401K Contribution', category: 'Savings', monthly_amount: 250, owner: 'joint' as const },
]

export const NP_POLICIES = [
  { provider: 'Allstate', type: 'medical' as const, premium_monthly: 170.23, coverage_summary: 'Medical insurance', renewal_date: null },
  { provider: 'Ameritas', type: 'dental' as const, premium_monthly: 39.04, coverage_summary: 'Dental insurance', renewal_date: null },
  { provider: 'USAA/State Farm', type: 'auto' as const, premium_monthly: 13.95, coverage_summary: 'Car & renters insurance', renewal_date: null },
  { provider: 'Northwestern Mutual', type: 'life' as const, premium_monthly: 364.07, coverage_summary: 'Variable Universal Life Insurance', renewal_date: null },
  { provider: 'Northwestern Mutual', type: 'disability' as const, premium_monthly: 53.80, coverage_summary: 'Disability Insurance', renewal_date: null },
]

export const MARKET_SYMBOLS = ['SPY', 'QQQ', 'AGG', 'BTC-USD']

export const ACCOUNT_TYPE_LABELS: Record<string, string> = {
  checking: 'Checking', savings: 'Savings', brokerage: 'Brokerage',
  crypto: 'Crypto', '401k': '401(k)', roth_401k: 'Roth 401(k)',
  roth_ira: 'Roth IRA', ira: 'IRA', life_insurance: 'Life Insurance',
  disability: 'Disability', espp: 'ESPP', credit_card: 'Credit Card',
  car_loan: 'Car Loan', private_equity: 'Private Equity', asset: 'Asset',
}
