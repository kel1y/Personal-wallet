import type { Metadata } from 'next'
import Dashboard from '../components/Dashboard'

export const metadata: Metadata = {
  title: 'Personal Wallet',
  description: 'Manage your personal finances',
}

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Personal Wallet</h1>
      <Dashboard />
    </main>
  )
}

