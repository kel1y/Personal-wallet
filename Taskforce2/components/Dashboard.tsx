'use client'

import { useState, useEffect } from 'react'
import { Transaction } from '../types'
import TransactionList from './TransactionList'
import TransactionForm from './TransactionForm'
import BudgetNotification from './BudgetNotification'
import TransactionSummary from './TransactionSummary'

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budget, setBudget] = useState(1000) // Default budget
  const [totalExpenses, setTotalExpenses] = useState(0)

  useEffect(() => {
    // Fetch transactions from API
    fetchTransactions()
  }, [])

  useEffect(() => {
    // Calculate total expenses
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    setTotalExpenses(expenses)
  }, [transactions])

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions')
    const data = await response.json()
    setTransactions(data)
  }

  const addTransaction = async (transaction) => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    })
    const newTransaction = await response.json()
    setTransactions([...transactions, newTransaction])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <TransactionForm onAddTransaction={addTransaction} />
        <BudgetNotification budget={budget} totalExpenses={totalExpenses} />
      </div>
      <div>
        <TransactionList transactions={transactions} />
        <TransactionSummary transactions={transactions} />
      </div>
    </div>
  )
}

