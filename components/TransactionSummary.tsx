'use client'

import { useEffect, useRef } from 'react'
import { Chart, ChartConfiguration, ChartData } from 'chart.js/auto'
import { Transaction } from '../types'

interface TransactionSummaryProps {
  transactions: Transaction[]
}

export default function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        const chartData: ChartData = {
          labels: ['Income', 'Expenses'],
          datasets: [
            {
              data: [
                transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
                transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
              ],
              backgroundColor: ['#10B981', '#EF4444'],
            },
          ],
        }

        const chartConfig: ChartConfiguration = {
          type: 'pie',
          data: chartData,
        }

        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        chartInstance.current = new Chart(ctx, chartConfig)
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [transactions])

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4">
      <h2 className="text-xl font-semibold mb-4">Transaction Summary</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

