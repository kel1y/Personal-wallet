import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { Category } from '../../../types'

const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Housing',
    subcategories: ['Rent', 'Mortgage', 'Utilities', 'Maintenance', 'Insurance']
  },
  {
    id: '2',
    name: 'Transportation',
    subcategories: ['Public Transit', 'Car Payment', 'Fuel', 'Car Insurance', 'Maintenance']
  },
  {
    id: '3',
    name: 'Food',
    subcategories: ['Groceries', 'Restaurants', 'Take Out', 'Snacks']
  },
  {
    id: '4',
    name: 'Healthcare',
    subcategories: ['Insurance', 'Medications', 'Doctor Visits', 'Dental Care']
  },
  {
    id: '5',
    name: 'Entertainment',
    subcategories: ['Movies', 'Games', 'Sports', 'Hobbies', 'Subscriptions']
  },
  {
    id: '6',
    name: 'Shopping',
    subcategories: ['Clothing', 'Electronics', 'Home Goods', 'Personal Care']
  },
  {
    id: '7',
    name: 'Education',
    subcategories: ['Tuition', 'Books', 'Courses', 'School Supplies']
  },
  {
    id: '8',
    name: 'Income',
    subcategories: ['Salary', 'Freelance', 'Investments', 'Gifts']
  }
]

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('wallet')

    // Clear existing categories
    await db.collection('categories').deleteMany({})

    // Insert initial categories
    await db.collection('categories').insertMany(initialCategories)

    return NextResponse.json({ message: 'Categories seeded successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed categories' }, { status: 500 })
  }
}

