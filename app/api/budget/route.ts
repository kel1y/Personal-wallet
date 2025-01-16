import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { Budget } from '../../../types'

export async function GET() {
  const client = await clientPromise
  const db = client.db('wallet')
  const budget = await db.collection('budget').findOne({})
  return NextResponse.json(budget || { amount: 1000, period: 'monthly' })
}

export async function POST(request: NextRequest) {
  const client = await clientPromise
  const db = client.db('wallet')
  const newBudget: Budget = await request.json()
  await db.collection('budget').updateOne({}, { $set: newBudget }, { upsert: true })
  return NextResponse.json(newBudget)
}

