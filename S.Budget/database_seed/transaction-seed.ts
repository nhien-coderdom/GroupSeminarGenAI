import { PrismaClient } from '../node_modules/.prisma/transaction-client';
import { SEED_USERS, SEED_CATEGORIES } from './constants';

const prisma = new PrismaClient();

export async function seedTransaction() {
  console.log('--- Seeding Transaction DB ---');

  for (const category of SEED_CATEGORIES) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {
        name: category.name,
        icon: category.icon,
        color: category.color,
      },
      create: category,
    });
  }

  // Generate some realistic transactions for John Doe
  const johnId = SEED_USERS[0].id;
  const transactions = [
    { id: 't1', amount: 4550n, type: 'expense', categoryId: SEED_CATEGORIES[0].id, note: 'Groceries' },
    { id: 't2', amount: 300000n, type: 'income', categoryId: SEED_CATEGORIES[3].id, note: 'Salary' },
    { id: 't3', amount: 1599n, type: 'expense', categoryId: SEED_CATEGORIES[2].id, note: 'Netflix' },
    { id: 't4', amount: 450n, type: 'expense', categoryId: SEED_CATEGORIES[0].id, note: 'Coffee' },
  ];

  for (const tx of transactions) {
    // We use a deterministic approach to avoid duplicates if upsert is tricky without unique constraints.
    // Transaction doesn't have unique constraint besides ID, we will just use a predefined UUID for idempotency.
    // Let's modify IDs to valid UUIDs.
    const uuid = `00000000-0000-0000-0000-00000000000${tx.id.replace('t', '')}`;
    
    await prisma.transaction.upsert({
      where: { id: uuid },
      update: {
        amount: tx.amount,
        type: tx.type,
        categoryId: tx.categoryId,
        note: tx.note,
      },
      create: {
        id: uuid,
        userId: johnId,
        amount: tx.amount,
        type: tx.type,
        categoryId: tx.categoryId,
        note: tx.note,
        source: 'manual'
      },
    });
  }

  console.log('Transaction DB seeded successfully.');
}
