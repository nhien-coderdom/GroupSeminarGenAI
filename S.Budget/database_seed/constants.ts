// Shared UUIDs to ensure relationships across microservices

export const SEED_USERS = [
  {
    id: 'f9b5b2c0-8d14-41b2-a4f6-8c4d29e3a61f',
    email: 'john.doe@example.com',
    name: 'John Doe',
    // 'password123' hashed with bcrypt (cost 10)
    passwordHash: '$2b$10$wN9iL/.u0rK4s4o2QGk2.ezDk2j5b4eR4O4A4E4I4O4U4A4E4I4O4', // Placeholder hash
  },
  {
    id: 'b7a3d2c1-8d14-41b2-a4f6-8c4d29e3a61a',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    passwordHash: '$2b$10$wN9iL/.u0rK4s4o2QGk2.ezDk2j5b4eR4O4A4E4I4O4U4A4E4I4O4',
  }
];

export const SEED_CATEGORIES = [
  { id: '11111111-1111-1111-1111-111111111111', name: 'Food & Dining', icon: 'fast-food', color: '#FF5733' },
  { id: '22222222-2222-2222-2222-222222222222', name: 'Transport', icon: 'car', color: '#3357FF' },
  { id: '33333333-3333-3333-3333-333333333333', name: 'Entertainment', icon: 'film', color: '#FF33F5' },
  { id: '44444444-4444-4444-4444-444444444444', name: 'Salary', icon: 'cash', color: '#33FF57' },
];
