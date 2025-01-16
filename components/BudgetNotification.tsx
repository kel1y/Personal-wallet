import { Budget } from '../types'

interface BudgetNotificationProps {
  budget: Budget
  totalExpenses: number
}

export default function BudgetNotification({ budget, totalExpenses }: BudgetNotificationProps) {
  const isOverBudget = totalExpenses > budget.amount

  if (!isOverBudget) return null

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <strong className="font-bold">Budget Exceeded!</strong>
      <span className="block sm:inline"> Your {budget.period} expenses (${totalExpenses.toFixed(2)}) have exceeded your budget (${budget.amount.toFixed(2)}).</span>
    </div>
  )
}

