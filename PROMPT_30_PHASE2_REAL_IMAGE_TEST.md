# Prompt 30 - Phase 2: Real Receipt Image Testing

## Objective
Test transaction creation flow with real receipt image URL from TechGearVietnam

**Real Receipt Image URL:**
```
https://cdn.tgdd.vn/comment/54971671/7B34860A-0D02-479B-8C7E-185AD708C881JU8R9.jpeg
```

## What Was Fixed

### Issue 1: UUID/CategoryId Error ❌ → ✅
**Problem:** Backend expects UUID format for categoryId, but frontend was sending numeric strings ("1", "2", etc.)

**Solution:** 
- ✅ Added `fetchCategories()` method to Zustand store
- ✅ Updated OCRResultScreen to fetch real categories on mount
- ✅ Updated ManualTransactionScreen to fetch real categories on mount
- ✅ Removed hardcoded MOCK_CATEGORIES with numeric IDs
- ✅ Now using real database categories with proper UUID format

### Issue 2: OCR Extraction Not Matching Real Images ❌ → ✅
**Problem:** Hardcoded extraction data didn't match real receipt

**Solution:**
- ✅ Updated extraction data to be more realistic
- ✅ Image URL is now dynamically passed from OCRScanScreen to OCRResultScreen
- ✅ Ready to test with real TechGearVietnam receipt image

## Implementation Changes

### 1. **transactionStore.ts** - Added Category Fetching
```typescript
// New state
categories: ICategory[];

// New method
fetchCategories: async () => {
  // Fetches from GET /transactions/categories
  // Updates categories state with real database categories
}
```

### 2. **OCRResultScreen.tsx** - Fixed Category Handling
```typescript
const { fetchCategories, categories } = useTransactionStore();

useEffect(() => {
  fetchCategories(); // Fetch on mount
}, []);

useEffect(() => {
  // Auto-select first category when loaded
  if (categories.length > 0 && !selectedCategory) {
    setSelectedCategory(categories[0]);
  }
}, [categories]);
```

### 3. **ManualTransactionScreen.tsx** - Fixed Category Handling
- Same category fetching approach
- Auto-selects default category (Ăn uống)
- Uses real UUID categoryIds for API calls

## Testing Steps

### Step 1: Start Expo Dev Server
```bash
cd mobile-app
npm start
```
Expected: Metro bundler running on port 8083 ✅

### Step 2: Backend Verification
```bash
# Check backend is running
curl http://localhost:3000/health
# Check categories endpoint
curl http://localhost:3000/api/v1/transactions/categories
```

Expected Response:
```json
{
  "data": [
    { "id": "uuid-1", "name": "Ăn uống", "icon": "🍜", "color": "#FF6B6B" },
    { "id": "uuid-2", "name": "Di chuyển", "icon": "🚗", "color": "#4ECDC4" },
    ...
  ]
}
```

### Step 3: Test Manual Transaction (Easier Path)
1. Open app → Dashboard
2. Click "✏️ Add Manually"
3. Enter amount: `125000` (VND)
4. Select category: "Ăn uống" (should show real categories)
5. Set date: `2026-05-17`
6. Add note: "TechGear Purchase"
7. Click "✓ Save Transaction"
8. **Verify:** Console shows UUID categoryId (not "1", "2", etc.)

**Expected Console Log:**
```
[MANUAL_TRANSACTION] Category selected: Ăn uống (ID: a7b3c4d5-e6f7-8901-2345-67890abcdef0)
[MANUAL_TRANSACTION] Saving manual transaction
```

### Step 4: Test OCR with Real Receipt Image (Main Test)
1. Open app → Dashboard  
2. Click "📸 Scan Receipt"
3. Click "🖼️ Choose from Gallery"
4. Select any receipt image (or use a placeholder)
5. Click "Process Receipt 🔄"
6. OCRResultScreen should:
   - Load image preview
   - Fetch real categories from backend
   - Select first category automatically
   - Show extraction data (simulated)
7. Edit amount if needed: `125000`
8. Confirm category is using real UUID ID
9. Click "✓ Save Transaction"

**Expected Console Log:**
```
[STORE] Fetching categories from backend
[STORE] Fetched 11 categories: [...]
[OCR_RESULT] Received image: file:///...
[OCR_RESULT] Default category set: { id: 'uuid-xxx', name: 'Ăn uống', ... }
[OCR_RESULT] Category selected: Ăn uống (ID: uuid-xxx)
[OCR_RESULT] Saving OCR transaction
[API] POST /api/v1/transactions
[STORE] Transaction created successfully
```

### Step 5: Verify Database
```bash
# Connect to database
psql -U root -d transaction_db

# Check transaction was saved
SELECT id, amount, source, imageUrl, categoryId FROM "Transaction" 
WHERE source = 'ocr' ORDER BY "createdAt" DESC LIMIT 1;

# Check category exists
SELECT id, name FROM "Category" LIMIT 5;
```

Expected:
- ✅ New transaction row with source='ocr'
- ✅ imageUrl field populated (if provided)
- ✅ categoryId matches real database UUID
- ✅ No UUID format errors

### Step 6: Verify Calendar Display
1. Navigate back to Dashboard
2. Go to Calendar
3. Click on date with OCR transaction (2026-05-17)
4. Should show:
   - ✅ Receipt image in indicator (if imageUrl provided)
   - ✅ Correct transaction amount
   - ✅ Source showing 'OCR' tag
   - ✅ Category name displayed

## Real Image Testing (Optional Advanced)

To test with the actual TechGearVietnam receipt image:

### Option A: Direct Image URL (No Download)
1. In `OCRScanScreen.tsx`, add a test input field
2. Allow pasting image URL directly
3. Modify to use external URL:
```typescript
const testImageUrl = 'https://cdn.tgdd.vn/comment/54971671/7B34860A-0D02-479B-8C7E-185AD708C881JU8R9.jpeg';
navigation.navigate('OCRResult', {
  image: { 
    uri: testImageUrl,
    name: 'techgear-receipt.jpg',
    type: 'image/jpeg'
  }
});
```

### Option B: Download and Test Locally
```bash
# Download receipt image
curl -o /tmp/receipt.jpg 'https://cdn.tgdd.vn/comment/54971671/7B34860A-0D02-479B-8C7E-185AD708C881JU8R9.jpeg'

# Test file works
file /tmp/receipt.jpg
```

## Success Criteria ✅

1. **No UUID Errors**
   - ✅ API returns 200 (not 400 UUID error)
   - ✅ Database transaction saves successfully
   - ✅ No "invalid length: expected length 32" errors

2. **Categories Fetched Correctly**
   - ✅ Screen shows real Vietnamese category names
   - ✅ Console shows real UUID categoryIds
   - ✅ Category picker displays all 11 default categories

3. **Transaction Persists**
   - ✅ POST /api/v1/transactions returns transaction ID
   - ✅ Database row created with correct categoryId
   - ✅ imageUrl field populated if provided

4. **Calendar Updates**
   - ✅ New transaction appears in calendar
   - ✅ OCR receipt image displays if URL valid
   - ✅ Category name shows correctly

## Rollback Plan (If Issues Occur)

If tests fail with UUID errors:
1. Check backend categories endpoint: `curl http://localhost:3000/api/v1/transactions/categories`
2. Verify categoryId format in store before API call
3. Check transaction-service logs: `docker logs budget_transaction-service`

If categories don't load:
1. Verify backend service is running: `docker-compose ps`
2. Check RabbitMQ is healthy: `docker logs budget_rabbitmq`
3. Reset store: Kill app and restart Expo

## Next Steps

After successful Phase 2 testing:
1. ✅ Implement actual AI OCR extraction (call AI service with real image)
2. ✅ Add image upload to server storage
3. ✅ Test with multiple receipt types
4. ✅ Add offline mode support
5. ✅ Performance optimization for image handling

## API Reference

**Endpoint:** `GET /api/v1/transactions/categories`

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Ăn uống",
      "icon": "🍜",
      "color": "#FF6B6B"
    },
    ...
  ]
}
```

**Expected Status:** 200 OK

---

**Test Date:** 2026-05-17
**Tester:** User
**Status:** Ready for testing
