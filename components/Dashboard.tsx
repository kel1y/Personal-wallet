'use client'

import { useState, useEffect } from 'react'
import { Transaction, Category, Budget } from '../types'
import TransactionList from './TransactionList'
import TransactionForm from './TransactionForm'
import BudgetNotification from './BudgetNotification'
import TransactionSummary from './TransactionSummary'
import BudgetSetting from './BudgetSetting'
import ReportGenerator from './ReportGenerator'

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [budget, setBudget] = useState<Budget>({ amount: 1000, period: 'monthly' })
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true)
      try {
        // First, seed the categories if needed
        await fetch('/api/seed')
        
        // Then fetch all data
        await Promise.all([
          fetchTransactions(),
          fetchCategories(),
          fetchBudget()
        ])
      } catch (error) {
        console.error('Error initializing data:', error)
      }
      setIsLoading(false)
    }

    initializeData()
  }, [])

  useEffect(() => {
    // Calculate total expenses for the current budget period
    const currentDate = new Date()
    const expenses = transactions
      .filter(t => t.type === 'expense' && isWithinBudgetPeriod(new Date(t.date), currentDate, budget.period))
      .reduce((sum, t) => sum + t.amount, 0)
    setTotalExpenses(expenses)
  }, [transactions, budget])

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions')
    const data = await response.json()
    setTransactions(data)
  }

  const fetchCategories = async () => {
    const response = await fetch('/api/categories')
    const data = await response.json()
    setCategories(data)
  }

  const fetchBudget = async () => {
    const response = await fetch('/api/budget')
    const data = await response.json()
    setBudget(data)
  }

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    })
    const newTransaction = await response.json()
    setTransactions([...transactions, newTransaction])
  }

  const updateBudget = async (newBudget: Budget) => {
    const response = await fetch('/api/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBudget),
    })
    const updatedBudget = await response.json()
    setBudget(updatedBudget)
  }

  const isWithinBudgetPeriod = (date: Date, currentDate: Date, period: Budget['period']) => {
    switch (period) {
      case 'daily':
        return date.toDateString() === currentDate.toDateString()
      case 'weekly':
        const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()))
        const weekEnd = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6))
        return date >= weekStart && date <= weekEnd
      case 'monthly':
        return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()
      case 'yearly':
        return date.getFullYear() === currentDate.getFullYear()
      default:
        return false
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <TransactionForm onAddTransaction={addTransaction} categories={categories} />
        <BudgetSetting currentBudget={budget} onUpdateBudget={updateBudget} />
        <BudgetNotification budget={budget} totalExpenses={totalExpenses} />
      </div>
      <div>
        <TransactionList transactions={transactions} />
        <TransactionSummary transactions={transactions} />
        <ReportGenerator transactions={transactions} />
      </div>
    </div>
  )
}

