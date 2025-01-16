import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { Category } from '../../../types'

export async function GET() {
  const client = await clientPromise
  const db = client.db('wallet')
  const categories = await db.collection('categories').find({}).toArray()
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  const client = await clientPromise
  const db = client.db('wallet')
  const category: Category = await request.json()
  await db.collection('categories').insertOne(category)
  return NextResponse.json(category)
}

