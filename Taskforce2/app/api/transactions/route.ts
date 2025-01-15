import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { Transaction } from '../../../types'

let transactions: Transaction[] = []

export async function GET() {
  return NextResponse.json(transactions)
}

export async function POST(request: NextRequest) {
  const transaction: Omit<Transaction, 'id'> = await request.json()
  const newTransaction: Transaction = {
    ...transaction,
    id: uuidv4(),
  }
  transactions.push(newTransaction)
  return NextResponse.json(newTransaction)
}
