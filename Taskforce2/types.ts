export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  account: string
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

