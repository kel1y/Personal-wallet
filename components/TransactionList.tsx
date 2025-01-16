import { Transaction } from '../types'

interface TransactionListProps {
  transactions: Transaction[]
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between items-center">
            <span>{transaction.description}</span>
            <span className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

