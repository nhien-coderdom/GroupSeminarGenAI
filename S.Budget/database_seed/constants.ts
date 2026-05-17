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
  // Pure Vietnamese Categories Only
  // No English fallbacks or duplicates
];

