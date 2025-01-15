export interface Transaction {
    id: string
    description: string
    amount: number
    type: 'income' | 'expense'
    account: string
    category: string
    date: string
  }
  
  