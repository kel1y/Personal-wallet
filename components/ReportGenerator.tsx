'use client'

import { useState } from 'react'
import { Transaction } from '../types'

interface ReportGeneratorProps {
  transactions: Transaction[]
}

export default function ReportGenerator({ transactions }: ReportGeneratorProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [report, setReport] = useState<Transaction[]>([])

  const generateReport = () => {
    const filteredTransactions = transactions.filter((t) => {
      const transactionDate = new Date(t.date)
      return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate)
    })
    setReport(filteredTransactions)
  }

  const totalIncome = report.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = report.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          onClick={generateReport}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Generate Report
        </button>
      </div>
      {report.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Report Summary</h3>
          <p>Total Income: ${totalIncome.toFixed(2)}</p>
          <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
          <p>Net: ${(totalIncome - totalExpenses).toFixed(2)}</p>
          <h3 className="text-lg font-semibold my-2">Transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{transaction.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${transaction.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{transaction.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{transaction.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{transaction.subcategory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

