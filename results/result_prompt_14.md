# BÁO CÁO DỰ ÁN S.BUDGET
# CHƯƠNG 2: CƠ SỞ LÝ THUYẾT

---

## 2.1 Tổng Quan Về Đề Tài

### 2.1.1 Quản lý tài chính cá nhân là gì?

Quản lý tài chính cá nhân (Personal Finance Management – PFM) là quá trình hoạch định, theo dõi, kiểm soát và tối ưu hóa các dòng tiền thu – chi của một cá nhân hoặc hộ gia đình nhằm đạt được các mục tiêu tài chính ngắn hạn và dài hạn. Đây là một lĩnh vực quan trọng trong kinh tế học hành vi và đã được nghiên cứu rộng rãi trong thập kỷ vừa qua.

Theo Garman & Forgue (2021), quản lý tài chính cá nhân hiệu quả bao gồm sáu hoạt động cốt lõi:

1. **Lập ngân sách (Budgeting)**: Phân bổ thu nhập cho các mục chi tiêu theo kế hoạch.
2. **Theo dõi chi tiêu (Expense Tracking)**: Ghi nhận và phân loại các giao dịch tài chính.
3. **Tiết kiệm (Saving)**: Tích lũy một phần thu nhập để dự phòng hoặc đầu tư.
4. **Quản lý nợ (Debt Management)**: Kiểm soát các khoản vay và trả nợ đúng hạn.
5. **Đầu tư (Investing)**: Sử dụng phần tiết kiệm để sinh lời theo thời gian.
6. **Kế hoạch dài hạn (Long-term Planning)**: Hướng đến hưu trí, mua nhà, giáo dục con cái.

### 2.1.2 Vai trò của ứng dụng PFM trong thời đại số

Với sự bùng nổ của smartphone và công nghệ tài chính (FinTech), các ứng dụng PFM đã trở thành công cụ đắc lực giúp người dùng:

- Tự động hóa việc theo dõi chi tiêu.
- Nhận báo cáo và biểu đồ trực quan theo thời gian thực.
- Được tư vấn tài chính thông minh dựa trên dữ liệu cá nhân.
- Đặt mục tiêu tiết kiệm và nhận nhắc nhở tự động.

**S.Budget** được xây dựng trong bối cảnh đó, với mục tiêu cung cấp một nền tảng PFM toàn diện, thân thiện và phù hợp với thói quen tài chính của người dùng Việt Nam.

---

## 2.2 Các Khái Niệm và Lý Thuyết Liên Quan

### 2.2.1 Mô hình ngân sách 50/30/20

Một trong những phương pháp lập ngân sách phổ biến nhất là **quy tắc 50/30/20** do Elizabeth Warren đề xuất:

| Tỷ lệ | Danh mục | Ví dụ |
|---|---|---|
| 50% | Nhu cầu thiết yếu | Ăn uống, thuê nhà, điện nước, đi lại |
| 30% | Mong muốn cá nhân | Giải trí, du lịch, mua sắm |
| 20% | Tiết kiệm & trả nợ | Tiết kiệm, đầu tư, trả nợ vay |

S.Budget áp dụng mô hình này làm nền tảng để gợi ý phân bổ ngân sách cho người dùng mới.

### 2.2.2 Kiến trúc Client – Server

S.Budget hoạt động theo mô hình **Client–Server** hai tầng:

- **Client (Frontend)**: Giao diện người dùng chạy trên trình duyệt web hoặc thiết bị di động, chịu trách nhiệm hiển thị dữ liệu và thu thập thao tác người dùng.
- **Server (Backend)**: Xử lý logic nghiệp vụ, xác thực, truy vấn cơ sở dữ liệu và trả về kết quả thông qua API.

### 2.2.3 RESTful API

**REST (Representational State Transfer)** là một kiểu kiến trúc phần mềm sử dụng giao thức HTTP để trao đổi dữ liệu giữa client và server. Các phương thức HTTP chính được sử dụng:

| Phương thức | Ý nghĩa | Ví dụ trong S.Budget |
|---|---|---|
| GET | Lấy dữ liệu | Lấy danh sách giao dịch |
| POST | Tạo mới dữ liệu | Thêm giao dịch mới |
| PUT/PATCH | Cập nhật dữ liệu | Sửa thông tin giao dịch |
| DELETE | Xóa dữ liệu | Xóa giao dịch |

### 2.2.4 JSON Web Token (JWT)

JWT là tiêu chuẩn xác thực phi trạng thái (stateless), gồm ba phần: **Header**, **Payload** và **Signature**, được mã hóa theo chuẩn Base64URL và ký bằng thuật toán HMAC hoặc RSA. S.Budget dùng JWT để quản lý phiên đăng nhập mà không cần lưu session phía server.

### 2.2.5 Machine Learning trong phân tích tài chính

S.Budget áp dụng một số kỹ thuật học máy cơ bản:

- **Phân loại (Classification)**: Tự động gán danh mục cho giao dịch dựa trên mô tả.
- **Phân tích chuỗi thời gian (Time Series Analysis)**: Dự báo chi tiêu theo xu hướng lịch sử.
- **Phát hiện bất thường (Anomaly Detection)**: Cảnh báo khi có giao dịch bất thường so với thói quen.

---

## 2.3 Các Công Nghệ Sử Dụng Trong Đồ Án

### 2.3.1 React.js (Frontend Web)

**React.js** là thư viện JavaScript mã nguồn mở do Meta (Facebook) phát triển, ra mắt năm 2013. React sử dụng mô hình **Component-based Architecture** và **Virtual DOM** để tối ưu hiệu năng render giao diện.

**Ưu điểm:**
- Tái sử dụng component cao, dễ bảo trì.
- Virtual DOM giảm thiểu thao tác DOM thực, tăng tốc render.
- Hệ sinh thái lớn: Redux, React Router, React Query.
- Hỗ trợ SSR qua Next.js, tăng SEO.

**Code minh họa – Component quản lý giao dịch:**

```jsx
// TransactionCard.jsx
import React from 'react';

const TransactionCard = ({ transaction }) => {
  const { title, amount, category, date, type } = transaction;

  return (
    <div className={`transaction-card ${type === 'expense' ? 'expense' : 'income'}`}>
      <div className="transaction-icon">
        <span>{getCategoryIcon(category)}</span>
      </div>
      <div className="transaction-info">
        <h4>{title}</h4>
        <p>{category} · {new Date(date).toLocaleDateString('vi-VN')}</p>
      </div>
      <div className="transaction-amount">
        <span>{type === 'expense' ? '-' : '+'}{amount.toLocaleString('vi-VN')}đ</span>
      </div>
    </div>
  );
};

export default TransactionCard;
```

**Giải thích:** Component `TransactionCard` nhận vào một đối tượng `transaction` qua props, hiển thị thông tin giao dịch với màu sắc khác nhau tùy loại thu/chi. Trong S.Budget, component này được dùng để render danh sách giao dịch ở màn hình Dashboard và Lịch sử giao dịch.

---

### 2.3.2 Node.js & Express.js (Backend)

**Node.js** là môi trường chạy JavaScript phía server, dựa trên V8 Engine của Chrome, sử dụng mô hình **non-blocking I/O** và **event-driven**. **Express.js** là framework web tối giản chạy trên Node.js, hỗ trợ xây dựng RESTful API nhanh chóng.

**Ưu điểm:**
- Xử lý đồng thời nhiều request mà không cần tạo thread mới.
- Dùng JavaScript cả frontend lẫn backend, thống nhất tech stack.
- Tốc độ phát triển nhanh, cộng đồng lớn (npm với hơn 1.8 triệu package).

**Code minh họa – Route API giao dịch:**

```javascript
// routes/transaction.route.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const TransactionController = require('../controllers/transaction.controller');

// GET /api/transactions - Lấy danh sách giao dịch của user
router.get('/', authMiddleware, TransactionController.getAll);

// POST /api/transactions - Thêm giao dịch mới
router.post('/', authMiddleware, TransactionController.create);

// PUT /api/transactions/:id - Cập nhật giao dịch
router.put('/:id', authMiddleware, TransactionController.update);

// DELETE /api/transactions/:id - Xóa giao dịch
router.delete('/:id', authMiddleware, TransactionController.delete);

module.exports = router;
```

```javascript
// controllers/transaction.controller.js
const Transaction = require('../models/Transaction');

exports.getAll = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(50);
    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      userId: req.user.id
    });
    await transaction.save();
    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
```

**Giải thích:** Route `/api/transactions` sử dụng `authMiddleware` để xác thực JWT trước khi cho phép truy cập. Controller `getAll` truy vấn MongoDB lấy 50 giao dịch gần nhất của user, sắp xếp theo ngày giảm dần. Trong S.Budget, đây là API cốt lõi phục vụ màn hình Dashboard và Lịch sử.

---

### 2.3.3 MongoDB (Cơ sở dữ liệu)

**MongoDB** là hệ quản trị cơ sở dữ liệu NoSQL dạng tài liệu (document-oriented), lưu trữ dữ liệu theo định dạng BSON (Binary JSON). MongoDB phù hợp với các ứng dụng cần schema linh hoạt và khả năng mở rộng ngang (horizontal scaling).

**Ưu điểm:**
- Schema linh hoạt: dễ thêm trường mới mà không cần migration.
- Hiệu năng cao với dữ liệu phi quan hệ.
- Tích hợp tốt với Node.js qua Mongoose ODM.

**Code minh họa – Schema giao dịch với Mongoose:**

```javascript
// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Tiêu đề giao dịch là bắt buộc'],
    trim: true,
    maxlength: 100
  },
  amount: {
    type: Number,
    required: [true, 'Số tiền là bắt buộc'],
    min: [0, 'Số tiền không thể âm']
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: {
    type: String,
    enum: ['food', 'transport', 'entertainment', 'health',
           'education', 'shopping', 'salary', 'other'],
    required: true
  },
  note: { type: String, maxlength: 500 },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Index để tối ưu query theo userId và date
transactionSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
```

**Giải thích:** Schema định nghĩa cấu trúc dữ liệu cho mỗi giao dịch. Trường `userId` tạo liên kết với collection `User`. Việc đánh index trên `{ userId: 1, date: -1 }` giúp tối ưu tốc độ truy vấn khi lọc giao dịch theo người dùng và sắp xếp theo thời gian – đây là pattern truy vấn phổ biến nhất trong S.Budget.

---

### 2.3.4 Firebase Authentication (Xác thực)

**Firebase Authentication** là dịch vụ xác thực của Google, hỗ trợ đăng nhập qua Email/Password, Google, Facebook, Apple và nhiều nhà cung cấp khác. Firebase xử lý toàn bộ luồng xác thực bảo mật, giúp nhóm phát triển tập trung vào nghiệp vụ chính.

**Ưu điểm:**
- Triển khai nhanh, bảo mật cao (tuân thủ OAuth 2.0, OpenID Connect).
- Tích hợp sẵn tính năng đặt lại mật khẩu, xác minh email.
- Free tier hào phóng: 10.000 xác thực/tháng.

**Code minh họa – Đăng nhập bằng Google:**

```javascript
// services/auth.service.js
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();

    // Gửi idToken lên backend để xác minh và tạo session
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    });

    return await response.json();
  } catch (error) {
    console.error('Lỗi đăng nhập Google:', error.message);
    throw error;
  }
};
```

**Giải thích:** Hàm `signInWithGoogle` mở popup xác thực Google, nhận về `idToken` từ Firebase rồi gửi lên backend để xác minh. Backend dùng Firebase Admin SDK để verify token, sau đó tạo JWT riêng của ứng dụng. Luồng này đảm bảo tính bảo mật hai lớp trong S.Budget.

---

### 2.3.5 Python & Scikit-learn (Module AI phân tích chi tiêu)

Module AI của S.Budget được xây dựng bằng **Python** sử dụng thư viện **Scikit-learn** để phân loại giao dịch tự động và dự báo chi tiêu.

**Code minh họa – Phân loại danh mục giao dịch:**

```python
# ai/category_classifier.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import pickle

class CategoryClassifier:
    def __init__(self):
        self.model = Pipeline([
            ('tfidf', TfidfVectorizer(ngram_range=(1, 2))),
            ('clf', MultinomialNB(alpha=0.1))
        ])

    def train(self, descriptions, labels):
        """Huấn luyện mô hình phân loại danh mục."""
        self.model.fit(descriptions, labels)

    def predict(self, description: str) -> str:
        """Dự đoán danh mục cho một giao dịch."""
        return self.model.predict([description])[0]

    def save(self, path: str):
        with open(path, 'wb') as f:
            pickle.dump(self.model, f)

    @classmethod
    def load(cls, path: str):
        instance = cls()
        with open(path, 'rb') as f:
            instance.model = pickle.load(f)
        return instance


# Ví dụ sử dụng
if __name__ == '__main__':
    classifier = CategoryClassifier()

    # Dữ liệu huấn luyện mẫu
    descriptions = [
        "Grab từ nhà đến trường", "Xăng xe máy", "Vé xe buýt",
        "Cơm trưa", "Cafe sáng", "Đi ăn buffet",
        "Học phí kỳ 2", "Mua sách lập trình", "Khóa học online"
    ]
    labels = ['transport', 'transport', 'transport',
              'food', 'food', 'food',
              'education', 'education', 'education']

    classifier.train(descriptions, labels)
    print(classifier.predict("Mua cơm hộp văn phòng"))  # → food
    print(classifier.predict("Đổ xăng xe"))              # → transport
```

**Giải thích:** Mô hình dùng **TF-IDF** để vector hóa mô tả giao dịch và **Naive Bayes** để phân loại. Pipeline kết hợp hai bước thành một luồng xử lý liền mạch. Trong S.Budget, khi người dùng nhập mô tả giao dịch, model sẽ tự động gợi ý danh mục phù hợp, tiết kiệm thao tác nhập liệu thủ công.

---

## 2.4 Minh Họa Kiến Trúc Hệ Thống

### 2.4.1 Kiến trúc tổng thể

S.Budget được xây dựng theo kiến trúc **3-tier (3 tầng)**:

```
┌─────────────────────────────────────────────────────────┐
│                   TẦNG TRÌNH DIỄN (CLIENT)              │
│         React.js Web App  │  React Native Mobile App    │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS / REST API / WebSocket
┌──────────────────────▼──────────────────────────────────┐
│                   TẦNG XỬ LÝ (SERVER)                   │
│   Node.js + Express.js API Server                       │
│   ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│   │ Auth Service│  │Transaction   │  │  AI/ML Service│  │
│   │ (Firebase)  │  │Service       │  │  (Python API) │  │
│   └─────────────┘  └──────────────┘  └───────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                   TẦNG DỮ LIỆU (DATA)                   │
│   MongoDB Atlas (Giao dịch, Ngân sách, Người dùng)      │
│   Firebase (Authentication, Push Notifications)         │
└─────────────────────────────────────────────────────────┘
```

### 2.4.2 Luồng xử lý thêm giao dịch

```
Người dùng nhập giao dịch
        │
        ▼
React App gọi POST /api/transactions
        │
        ▼
authMiddleware xác thực JWT
        │
        ▼
AI Service dự đoán danh mục (nếu chưa chọn)
        │
        ▼
Controller lưu vào MongoDB
        │
        ▼
Kiểm tra vượt ngân sách → Gửi Push Notification (nếu có)
        │
        ▼
Trả về response → Cập nhật UI
```

---

## 2.5 Khảo Sát Các Dự Án / Hệ Thống Liên Quan

### 2.5.1 Bảng so sánh các ứng dụng PFM

| Tiêu chí | **Mint** (Intuit) | **Money Lover** | **YNAB** | **S.Budget** |
|---|---|---|---|---|
| Nền tảng | iOS, Android, Web | iOS, Android | iOS, Android, Web | iOS, Android, Web |
| Ngôn ngữ | Tiếng Anh | Đa ngôn ngữ (có VI) | Tiếng Anh | Tiếng Việt |
| Miễn phí | Có (quảng cáo) | Freemium | Trả phí ($14.99/tháng) | Freemium |
| Kết nối ngân hàng | Có (Mỹ) | Không | Có | Không (v1) |
| AI gợi ý | Cơ bản | Không | Không | Có |
| Phù hợp VN | Không | Một phần | Không | Có |

### 2.5.2 Phân tích chi tiết từng dự án

**1. Mint (Intuit)**

- **Ưu điểm**: Tích hợp ngân hàng tự động, biểu đồ phong phú, cảnh báo thông minh.
- **Hạn chế**: Chỉ hỗ trợ tài khoản ngân hàng Mỹ, không phù hợp người dùng Việt Nam. Đã ngừng hoạt động từ tháng 1/2024.
- **Bài học**: Cần có kế hoạch dài hạn cho dịch vụ; tích hợp ngân hàng là lợi thế cạnh tranh lớn.

**2. Money Lover**

- **Ưu điểm**: Giao diện thân thiện, hỗ trợ tiếng Việt, phổ biến tại Đông Nam Á.
- **Hạn chế**: Tính năng AI hạn chế, phiên bản miễn phí bị cắt nhiều tính năng quan trọng, UX chưa hiện đại.
- **Bài học**: Cần cân bằng giữa freemium và trải nghiệm người dùng; không nên hạn chế quá nhiều ở bản free.

**3. YNAB (You Need A Budget)**

- **Ưu điểm**: Phương pháp ngân sách zero-based rõ ràng, cộng đồng người dùng mạnh, giáo dục tài chính tốt.
- **Hạn chế**: Chi phí cao, đường cong học tập dốc, không phù hợp người mới.
- **Bài học**: UX đơn giản và onboarding tốt là yếu tố then chốt để giữ chân người dùng mới.

### 2.5.3 Bài học rút ra cho S.Budget

Từ việc khảo sát các hệ thống trên, nhóm rút ra những định hướng phát triển cho S.Budget:

1. **Ưu tiên UX đơn giản**: Người dùng Việt Nam, đặc biệt là sinh viên, cần giao diện trực quan, không cần đào tạo.
2. **Freemium thông minh**: Phiên bản miễn phí phải đủ dùng để xây dựng thói quen, tính năng premium tạo giá trị thực sự.
3. **AI là điểm khác biệt**: Không ứng dụng nào trong nước có AI phân tích chi tiêu đủ mạnh – đây là lợi thế cạnh tranh của S.Budget.
4. **Bản địa hóa sâu**: Hỗ trợ VND, danh mục phù hợp thói quen Việt (lì xì, học phí, xe máy...).

---

## 2.6 Kết Luận Chương

Chương 2 đã trình bày toàn diện cơ sở lý thuyết và nền tảng công nghệ của dự án S.Budget. Cụ thể:

- **Về lý thuyết**: Các khái niệm về quản lý tài chính cá nhân, mô hình ngân sách 50/30/20, kiến trúc Client–Server, RESTful API và JWT đã được làm rõ, tạo nền tảng vững chắc cho quá trình thiết kế và triển khai.

- **Về công nghệ**: Các công nghệ được lựa chọn gồm React.js, Node.js + Express.js, MongoDB, Firebase Authentication và Python/Scikit-learn đều được minh chứng bằng code cụ thể và giải thích ứng dụng thực tế trong đồ án.

- **Về khảo sát**: Qua phân tích ba ứng dụng PFM nổi bật (Mint, Money Lover, YNAB), nhóm xác định được khoảng trống thị trường mà S.Budget có thể khai thác: ứng dụng PFM tích hợp AI, bản địa hóa cho người dùng Việt Nam với trải nghiệm người dùng hiện đại và mô hình freemium hợp lý.

Những nền tảng lý thuyết và kỹ thuật này sẽ được áp dụng trực tiếp vào quá trình phân tích, thiết kế hệ thống được trình bày trong **Chương 3**.

---

*Tài liệu tham khảo chương này bao gồm: Garman & Forgue (2021), tài liệu chính thức của React.js, Node.js, MongoDB, Firebase và Scikit-learn.*
