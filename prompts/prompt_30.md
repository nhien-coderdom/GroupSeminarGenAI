# Prompt 30: OCR Transaction Creation Flow & Manual Transaction Creation System

## 🎯 Objective

Implement complete OCR and manual transaction creation flows with realtime synchronization to dashboard calendar indicators.

**Phase:** AI OCR Receipt Scanning & Unified Transaction Creation Flow  
**Scope:** Mobile App (React Native), Backend API (NestJS), Database (PostgreSQL)

---

## 📋 Requirements Breakdown

### Part 1: UI Components to Create

#### 1.1 OCR Scan Screen (`OCRScanScreen.tsx`)
- **Purpose:** Camera interface to scan receipts
- **Features:**
  - Camera view with scanning overlay
  - Capture button
  - Photo library import option
  - Back button
- **Requirements:**
  - Use React Native Camera (if available) or placeholder for now
  - Show "Scanning receipt..." while processing
  - Navigate to `OCRResultScreen` after capture
  - Debug logging: `[OCR_SCAN]` prefix

#### 1.2 OCR Result Confirmation Screen (`OCRResultScreen.tsx`)
- **Purpose:** Display OCR-extracted data for confirmation
- **Features:**
  - Receipt image thumbnail
  - Auto-filled form fields:
    - Amount (required, extracted from image)
    - Category (suggested based on OCR analysis)
    - Date (extracted from receipt timestamp)
    - Note/Description (optional)
  - Edit buttons for each field
  - Confirm & Save button
  - Cancel button
- **Requirements:**
  - Support user corrections before saving
  - Show spinner during save
  - Navigate to Dashboard on success
  - Debug logging: `[OCR_RESULT]` prefix
  - Show transaction source as "ocr"

#### 1.3 Manual Transaction Create Screen (`ManualTransactionScreen.tsx`)
- **Purpose:** Text-based transaction entry
- **Features:**
  - Amount input (required)
  - Category picker (dropdown)
  - Date picker
  - Transaction type (income/expense)
  - Description/Note (optional)
  - Save button
- **Requirements:**
  - Validate amount > 0
  - Require category selection
  - Default to today's date
  - Default to "expense" type
  - Show spinner during save
  - Navigate to Dashboard on success
  - Debug logging: `[MANUAL_TRANSACTION]` prefix
  - Set transaction source as "manual"

#### 1.4 Updated TransactionScreen (`TransactionScreen.tsx`)
- **Purpose:** Add action buttons
- **Changes:**
  - Add "Add Transaction" button (prominent)
  - Add "Scan Receipt (OCR)" button
  - Add "Add Manually" button
  - Buttons navigate to appropriate screens
  - Remove mock data, show real transactions

### Part 2: Store Updates

#### 2.1 Extended Zustand Store
- **File:** `mobile-app/src/store/transactionStore.ts`
- **Changes:**
  - Add `createTransaction(dto)` method
  - Add `updateTransaction(id, dto)` method
  - Add loading state for creation
  - Implement realtime refresh after save
  - Auto-update `monthlyTransactions` after create
  - Auto-update `selectedTransactions` after create
  - Auto-recalculate monthly summary (income/expense)
  - Debug logging: `[STORE_CREATE]`, `[STORE_UPDATE]` prefixes

### Part 3: API Integration

#### 3.1 Transaction Creation API Call
- **Endpoint:** `POST /api/v1/transactions`
- **Body:** CreateTransactionDto
- **Expected Response:** Created transaction object
- **Handles:** OCR transactions (source='ocr', imageUrl set)
- **Error Handling:** Show toast/alert on failure
- **Debug Logging:** `[API_CREATE]` prefix

#### 3.2 Backend Endpoints (Verify Existing)
- `POST /api/v1/transactions` - Create
- `PUT /api/v1/transactions/{id}` - Update
- `GET /api/v1/transactions` - List
- `GET /api/v1/transactions/by-date` - By date
- `GET /api/v1/transactions/categories` - Categories

### Part 4: Realtime Synchronization

#### 4.1 Dashboard Calendar Refresh
- **Trigger:** After transaction created
- **Action:** 
  - Refresh `monthlyTransactions` in store
  - Calendar re-renders with new indicator
  - Show calendar indicator appears immediately
- **Implementation:** Zustand observer pattern

#### 4.2 Transaction Detail Refresh
- **Trigger:** After transaction created
- **Action:**
  - If detail screen open, refresh `selectedTransactions`
  - Show new transaction in list immediately

#### 4.3 Monthly Summary Refresh
- **Trigger:** After transaction created
- **Action:**
  - Recalculate `monthlyIncome` and `monthlyExpense`
  - Dashboard summary cards update

---

## 🏗️ Architecture

```
OCR Scan Screen
    ↓ capture image
OCR Result Screen (with form)
    ↓ confirm & save
API: POST /transactions
    ↓
Backend: Transaction Service
    ↓
Prisma: Create transaction record
    ↓
PostgreSQL: Insert with source='ocr'
    ↓
Zustand Store: Auto-update monthlyTransactions
    ↓
Calendar Component: Re-render with new indicator
TransactionDetailScreen: Show new transaction
Dashboard Summary: Update income/expense totals
```

---

## 📊 Data Flow

### OCR Transaction Create Flow

```
1. User opens TransactionScreen
2. Clicks "Scan Receipt (OCR)"
3. Navigates to OCRScanScreen
4. Takes photo of receipt
5. Captured image sent to OCRResultScreen
6. Form pre-fills with extracted data:
   - amount (from receipt total)
   - category (guessed from receipt type)
   - date (from receipt date or today)
   - note (merchant name or description)
7. User can edit/confirm
8. Clicks "Save"
9. API call: POST /transactions
   {
     amount: number,
     categoryId: uuid,
     note: string,
     imageUrl: base64 or URL,
     source: 'ocr',
     type: 'expense'
   }
10. Backend creates transaction with source='ocr'
11. Zustand auto-refreshes
12. Calendar indicator updates immediately
13. Navigate back to Dashboard
14. User sees new transaction on calendar
```

### Manual Transaction Create Flow

```
1. User opens TransactionScreen
2. Clicks "Add Manually"
3. Navigates to ManualTransactionScreen
4. Fills in form manually:
   - amount
   - category
   - date
   - type (income/expense)
   - note
5. Clicks "Save"
6. API call: POST /transactions
   {
     amount: number,
     categoryId: uuid,
     note: string,
     source: 'manual',
     type: 'expense'
   }
7. Backend creates transaction with source='manual'
8. Zustand auto-refreshes
9. Calendar shows badge update (no image for manual)
10. Navigate back to Dashboard
```

---

## 🗺️ File Structure

```
mobile-app/src/
├── screens/
│   ├── DashboardScreen.tsx (updated)
│   ├── TransactionScreen.tsx (updated - add buttons)
│   ├── OCRScanScreen.tsx (NEW)
│   ├── OCRResultScreen.tsx (NEW)
│   ├── ManualTransactionScreen.tsx (NEW)
│   └── TransactionDetailScreen.tsx (updated - realtime refresh)
├── components/
│   ├── TransactionCard.tsx
│   └── Calendar.tsx (no changes)
├── store/
│   └── transactionStore.ts (updated - add createTransaction)
├── services/
│   └── api.ts (no changes needed)
└── navigation/
    └── index.ts (updated - add routes)

S.Budget/
├── apps/
│   ├── api-gateway/
│   │   └── src/transaction.gateway.ts (no changes)
│   └── transaction-service/
│       └── src/transaction-service.service.ts (verify create works)
```

---

## 🧪 Test Cases

### OCR Flow Tests

**TC1:** Create OCR transaction with all fields
- [ ] OCR image captured
- [ ] Form auto-fills
- [ ] User confirms
- [ ] Transaction saved to DB with source='ocr'
- [ ] Calendar indicator updates
- [ ] Dashboard summary updates

**TC2:** Create OCR transaction with edits
- [ ] User modifies auto-filled amount
- [ ] User changes category
- [ ] User edits date
- [ ] Transaction saved with edited data

**TC3:** OCR transaction with mixed data
- [ ] Same day has manual + OCR
- [ ] Calendar shows OCR thumbnail + badge "2"

### Manual Flow Tests

**TC4:** Create manual transaction
- [ ] Manual form filled
- [ ] Transaction saved with source='manual'
- [ ] Calendar shows badge (no image)
- [ ] Dashboard summary updates

**TC5:** Manual transaction validation
- [ ] Amount required
- [ ] Category required
- [ ] Can't save with empty fields

**TC6:** Monthly summary accuracy
- [ ] Add expense
- [ ] monthlyExpense increases
- [ ] Add income
- [ ] monthlyIncome increases
- [ ] Summary card updates

### Integration Tests

**TC7:** Calendar realtime update
- [ ] Create transaction on day 17
- [ ] Calendar day 17 indicator appears immediately
- [ ] No page refresh needed

**TC8:** Transaction detail sync
- [ ] Create transaction
- [ ] Open TransactionDetail
- [ ] New transaction visible
- [ ] Counts match database

---

## ✅ Acceptance Criteria

### Code Quality
- [ ] TypeScript strict mode all files
- [ ] No `any` types
- [ ] Props properly typed
- [ ] Error handling on all API calls
- [ ] Loading states show properly
- [ ] Debug logging with prefixes: `[OCR_SCAN]`, `[OCR_RESULT]`, `[MANUAL_TRANSACTION]`, `[STORE_CREATE]`, `[API_CREATE]`

### UX/UI
- [ ] OCR scan screen matches design (TODO: confirm with UX team)
- [ ] Forms are responsive
- [ ] Loading spinners show during save
- [ ] Success/error messages display
- [ ] Navigation flows smooth
- [ ] No broken layouts

### Backend
- [ ] API accepts CreateTransactionDto
- [ ] Transaction saved with correct source
- [ ] imageUrl stored properly
- [ ] Categories linked correctly
- [ ] Response includes full transaction object

### Database
- [ ] Transaction inserted with source='ocr' or 'manual'
- [ ] imageUrl field populated for OCR
- [ ] createdAt timestamp correct
- [ ] categoryId foreign key valid
- [ ] No data loss or corruption

### Realtime Sync
- [ ] Calendar updates without refresh
- [ ] Monthly summary updates immediately
- [ ] Transaction list updates immediately
- [ ] No stale data displayed
- [ ] No duplicate transactions

---

## 🚀 Implementation Steps

1. **Inspect:** Verify API endpoints and database schema
2. **Create:** OCRScanScreen component
3. **Create:** OCRResultScreen component
4. **Create:** ManualTransactionScreen component
5. **Update:** TransactionScreen with action buttons
6. **Update:** transactionStore with createTransaction method
7. **Test:** OCR flow end-to-end
8. **Test:** Manual flow end-to-end
9. **Test:** Realtime synchronization
10. **Test:** Calendar indicator updates
11. **Test:** Mixed OCR + Manual scenarios
12. **Debug:** Any runtime errors or undefined states
13. **Verify:** All data matches database
14. **Report:** Implementation summary and test results

---

## 📝 Deliverables

- [ ] All 3 new screens implemented
- [ ] Updated screens with proper navigation
- [ ] Zustand store with transaction creation
- [ ] Realtime calendar refresh working
- [ ] All test cases passing
- [ ] Debug logs showing proper flow
- [ ] Database verification logs
- [ ] Implementation report
- [ ] Testing report
- [ ] No mock data in production

---

## 🔗 Related Files

- Prisma Schema: `S.Budget/apps/transaction-service/prisma/schema.prisma`
- API Controller: `S.Budget/apps/transaction-service/src/transaction-service.controller.ts`
- DTO: `S.Budget/libs/shared/src/dto/create-transaction.dto.ts`
- Store: `mobile-app/src/store/transactionStore.ts`
- Navigation: `mobile-app/src/navigation/index.ts`

---

## ⚠️ Important Notes

- OCR image processing: Using placeholder URLs for now (backend can integrate Cloud Vision API later)
- Camera implementation: Using expo-camera or fallback to photo library
- Categories: Should be fetched from API endpoints already working
- Error handling: Must show user-friendly messages
- Performance: Avoid blocking UI during network requests

---

**Status:** Ready for Implementation  
**Estimated Effort:** 4-6 hours  
**Priority:** High - Core feature for transaction creation  
**Risk Level:** Medium - Requires API integration and realtime sync
