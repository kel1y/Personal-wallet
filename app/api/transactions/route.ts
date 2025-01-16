import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import clientPromise from '../../../lib/mongodb'
import { Transaction } from '../../../types'

export async function GET() {
  const client = await clientPromise
  const db = client.db('wallet')
  const transactions = await db.collection('transactions').find({}).toArray()
  return NextResponse.json(transactions)
}

export async function POST(request: NextRequest) {
  const client = await clientPromise
  const db = client.db('wallet')
  const transaction: Omit<Transaction, 'id'> = await request.json()
  const newTransaction: Transaction = {
    ...transaction,
    id: uuidv4(),
  }
  await db.collection('transactions').insertOne(newTransaction)
  return NextResponse.json(newTransaction)
}

