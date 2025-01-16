'use client'

import { useState } from 'react'
import { Budget } from '../types'

interface BudgetSettingProps {
  currentBudget: Budget
  onUpdateBudget: (budget: Budget) => void
}

export default function BudgetSetting({ currentBudget, onUpdateBudget }: BudgetSettingProps) {
  const [amount, setAmount] = useState(currentBudget.amount.toString())
  const [period, setPeriod] = useState<Budget['period']>(currentBudget.period)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateBudget({
      amount: parseFloat(amount),
      period,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">Set Budget</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="budgetAmount" className="block text-sm font-medium text-gray-700">
            Budget Amount
          </label>
          <input
            type="number"
            id="budgetAmount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="budgetPeriod" className="block text-sm font-medium text-gray-700">
            Budget Period
          </label>
          <select
            id="budgetPeriod"
            value={period}
            onChange={(e) => setPeriod(e.target.value as Budget['period'])}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update Budget
        </button>
      </div>
    </form>
  )
}

