# Prompt 29: Dashboard Calendar Transaction Flow & Transaction Detail Screen Integration

## Objective
Implement a calendar-based dashboard UX, replace the mock transaction UI, and build a real database-driven Transaction Detail flow.

## Requirements
1. **Frontend (Mobile App)**:
   - Completely remove the old "Recent Transactions" banking-style layout from `DashboardScreen.tsx`.
   - Implement the calendar-first dashboard experience.
   - Implement `TransactionDetailScreen.tsx` that navigates from a clicked calendar date.
   - Connect the UI to Zustand `transactionStore.ts`.
   - Implement API fetching for real transactions.

2. **Backend (NestJS)**:
   - Ensure `GET /transactions/by-date` exists and returns the correct payload format.
   - Ensure PostgreSQL transaction seed data is complete.
   
3. **End-to-End**:
   - Verify UI data matches DB exactly.
   - Extensive Debug Logging.
   - Automated testing and Docker verification.
