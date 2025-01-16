export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  account: 'bank' | 'mobile' | 'cash'
  category: string
  subcategory: string
  date: string
}

export interface Category {
  id: string
  name: string
  subcategories: string[]
}

export interface Budget {
  amount: number
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

