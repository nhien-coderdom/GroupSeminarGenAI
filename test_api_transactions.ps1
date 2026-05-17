# Test API endpoints for transaction creation
Write-Host '[TEST_API] Starting API verification...' -ForegroundColor Cyan

try {
  # 1. Login
  Write-Host '[TEST_API_1] Logging in...' -ForegroundColor Yellow
  $loginResponse = Invoke-RestMethod -Uri 'http://localhost:3000/api/v1/auth/login' `
    -Method Post `
    -ContentType 'application/json' `
    -Body (ConvertTo-Json @{
      email = 'user@example.com'
      password = 'password123'
    })

  $token = $loginResponse.token
  Write-Host '[TEST_API_1] ✓ Login successful!' -ForegroundColor Green

  # 2. Create Manual Transaction
  Write-Host '[TEST_API_2] Creating manual transaction...' -ForegroundColor Yellow
  $manualResponse = Invoke-RestMethod -Uri 'http://localhost:3000/api/v1/transactions' `
    -Method Post `
    -ContentType 'application/json' `
    -Headers @{ Authorization = "Bearer $token" } `
    -Body (ConvertTo-Json @{
      amount = 100000
      categoryId = '1'
      note = 'Test manual transaction'
      source = 'manual'
      type = 'expense'
    })

  Write-Host '[TEST_API_2] ✓ Manual transaction created!' -ForegroundColor Green
  Write-Host "  ID: $($manualResponse.id)"
  Write-Host "  Amount: $($manualResponse.amount)"
  Write-Host "  Source: $($manualResponse.source)"

  # 3. Create OCR Transaction
  Write-Host '[TEST_API_3] Creating OCR transaction...' -ForegroundColor Yellow
  $ocrResponse = Invoke-RestMethod -Uri 'http://localhost:3000/api/v1/transactions' `
    -Method Post `
    -ContentType 'application/json' `
    -Headers @{ Authorization = "Bearer $token" } `
    -Body (ConvertTo-Json @{
      amount = 150000
      categoryId = '2'
      note = 'Test OCR transaction'
      source = 'ocr'
      type = 'expense'
      imageUrl = 'https://placeholder.com/300x400'
    })

  Write-Host '[TEST_API_3] ✓ OCR transaction created!' -ForegroundColor Green
  Write-Host "  ID: $($ocrResponse.id)"
  Write-Host "  Amount: $($ocrResponse.amount)"
  Write-Host "  Source: $($ocrResponse.source)"
  Write-Host "  ImageUrl: $($ocrResponse.imageUrl)"

  # 4. Get all transactions
  Write-Host '[TEST_API_4] Fetching all transactions...' -ForegroundColor Yellow
  $allResponse = Invoke-RestMethod -Uri 'http://localhost:3000/api/v1/transactions?limit=100' `
    -Method Get `
    -Headers @{ Authorization = "Bearer $token" }

  $transactions = $allResponse.data
  Write-Host '[TEST_API_4] ✓ Transactions fetched!' -ForegroundColor Green
  Write-Host "  Total: $($transactions.Length)"

  $manualCount = ($transactions | Where-Object { $_.source -eq 'manual' }).Length
  $ocrCount = ($transactions | Where-Object { $_.source -eq 'ocr' }).Length
  Write-Host "  Manual: $manualCount"
  Write-Host "  OCR: $ocrCount"

  Write-Host '[TEST_API] ✅ All API tests PASSED!' -ForegroundColor Green
} catch {
  Write-Host "[TEST_API] ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}
