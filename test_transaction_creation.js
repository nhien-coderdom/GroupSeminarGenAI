const axios = require('axios');

const test = async () => {
  try {
    console.log('[TEST_FLOW] Starting transaction creation test flow...');
    
    // 1. Login
    console.log('[TEST_FLOW_1] Login to get JWT token');
    const loginRes = await axios.post('http://localhost:3000/api/v1/auth/login', {
      email: 'user@example.com',
      password: 'password123'
    });
    const token = loginRes.data.token;
    console.log('[TEST_FLOW_1] ✓ Login successful, token:', token.substring(0, 20) + '...');
    
    // 2. Test create manual transaction
    console.log('[TEST_FLOW_2] Creating manual transaction...');
    const manualRes = await axios.post('http://localhost:3000/api/v1/transactions', {
      amount: 100000,
      categoryId: '1',
      note: 'Test manual transaction',
      source: 'manual',
      type: 'expense'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('[TEST_FLOW_2] ✓ Manual transaction created:', manualRes.data.id);
    console.log('  Amount:', manualRes.data.amount);
    console.log('  Source:', manualRes.data.source);
    console.log('  Type:', manualRes.data.type);
    
    // 3. Test create OCR transaction
    console.log('[TEST_FLOW_3] Creating OCR transaction...');
    const ocrRes = await axios.post('http://localhost:3000/api/v1/transactions', {
      amount: 150000,
      categoryId: '2',
      note: 'Test OCR transaction',
      source: 'ocr',
      type: 'expense',
      imageUrl: 'https://placeholder.com/300x400'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('[TEST_FLOW_3] ✓ OCR transaction created:', ocrRes.data.id);
    console.log('  Amount:', ocrRes.data.amount);
    console.log('  Source:', ocrRes.data.source);
    console.log('  ImageUrl:', ocrRes.data.imageUrl);
    
    // 4. Fetch all transactions
    console.log('[TEST_FLOW_4] Fetching all transactions...');
    const allRes = await axios.get('http://localhost:3000/api/v1/transactions', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const transactions = allRes.data.data || [];
    console.log('[TEST_FLOW_4] ✓ Fetched', transactions.length, 'transactions');
    
    // Count by source
    const manualCount = transactions.filter(t => t.source === 'manual').length;
    const ocrCount = transactions.filter(t => t.source === 'ocr').length;
    console.log('  Manual:', manualCount);
    console.log('  OCR:', ocrCount);
    
    console.log('[TEST_FLOW] ✅ All tests passed!');
  } catch (error) {
    console.error('[TEST_FLOW] ❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
};

test();
