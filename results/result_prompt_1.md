# Result Prompt 1: Kế hoạch xây dựng Project S.Budget

---

## 📋 TÓM TẮT USER STORIES

### EPIC 1: Ghi nhận giao dịch (Transaction Capture)
| ID | Tên | Mô tả |
|----|-----|-------|
| US-01 | Quick Add bằng text | Nhập "80k cafe" → tự parse amount + category |
| US-02 | Upload ảnh tạo giao dịch | Upload ảnh hóa đơn → OCR → preview → lưu |
| US-03 | Share screenshot vào app | Share ảnh từ phone → AI detect → confirm nhanh ≤ 2 bước |
| US-04 | Chụp ảnh trực tiếp | Camera button → auto upload → AI xử lý |

### EPIC 2: AI xử lý & tự động hóa
| ID | Tên | Mô tả |
|----|-----|-------|
| US-05 | OCR đọc nội dung ảnh | Extract rawText từ hóa đơn/screenshot |
| US-06 | Nhận diện số tiền | Parse "80k" → 80000, "1.200.000" → 1200000 |
| US-07 | Phân loại chi tiêu tự động | Input text → Output category + confidence |
| US-08 | Gợi ý giao dịch khi mở app | Detect ảnh mới → hiển thị preview + nút Add/Ignore |

### EPIC 3: Quản lý tài chính
| ID | Tên | Mô tả |
|----|-----|-------|
| US-09 | Xem danh sách giao dịch | List amount/category/date + filter |
| US-10 | Chỉnh sửa giao dịch | Edit amount/category/note, save ≤ 1 thao tác |
| US-11 | Xóa giao dịch | Confirm/undo + soft delete |

### EPIC 4: Insight & phân tích (AI value)
| ID | Tên | Mô tả |
|----|-----|-------|
| US-12 | Thống kê chi tiêu | Biểu đồ theo category, tổng theo tháng |
| US-13 | Phát hiện hành vi chi tiêu | Insight: "40% cho ăn uống", "tăng so với tuần trước" |
| US-14 | Gợi ý tiết kiệm (AI) | Generate recommendation từ data |

### EPIC 5: Hệ thống & bảo mật
| ID | Tên | Mô tả |
|----|-----|-------|
| US-15 | Đăng nhập / đăng ký | Tài khoản cá nhân |
| US-16 | Bảo mật dữ liệu | Bảo vệ dữ liệu tài chính |

---

## 🛠 TÓM TẮT TECH STACK

| Layer | Công nghệ | Vai trò |
|-------|-----------|---------|
| Backend | NestJS + TypeScript | Microservices architecture (Module/Controller/Service) |
| API Gateway | NestJS Gateway module | Entry point, routing, JWT auth, rate limiting, logging |
| Database | PostgreSQL + Prisma ORM | Database per service (auth_db, transaction_db, insight_db) |
| AI - OCR | Azure Form Recognizer / Google Cloud Vision | Scan hóa đơn/screenshot, extract text + amount |
| AI - Insight | OpenAI API | Phân tích hành vi, generate insight/recommendation |
| Message Queue | RabbitMQ | Async AI processing, tách transaction & AI service |
| Image Storage | Cloudinary | Lưu ảnh hóa đơn/screenshot, trả URL |
| Container | Docker | Đóng gói từng microservice thành container |
| Testing | Jest | Unit test (service logic) + Integration test (API endpoints) |
| CI/CD | GitHub Actions | Pipeline: build → test → deploy |
| Registry | Docker Hub | Container registry |

---

## 🏗 KIẾN TRÚC HỆ THỐNG

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Mobile App)                   │
│              (Flutter / React Native - TBD)              │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    API GATEWAY (NestJS)                   │
│          JWT Auth │ Rate Limit │ Routing │ Logging        │
└────┬──────────────┬──────────────┬──────────────────────┘
     │              │              │
     ▼              ▼              ▼
┌─────────┐  ┌──────────────┐  ┌──────────────┐
│  AUTH    │  │ TRANSACTION  │  │   INSIGHT    │
│ SERVICE  │  │   SERVICE    │  │   SERVICE    │
│ (NestJS) │  │  (NestJS)    │  │  (NestJS)    │
├─────────┤  ├──────────────┤  ├──────────────┤
│ auth_db  │  │transaction_db│  │  insight_db  │
│(Postgres)│  │ (Postgres)   │  │ (Postgres)   │
└─────────┘  └──────┬───────┘  └──────┬───────┘
                     │                 │
                     │  RabbitMQ       │
                     ▼                 ▼
              ┌──────────────────────────────┐
              │        AI SERVICE (NestJS)    │
              │  ┌─────────┐  ┌────────────┐ │
              │  │  OCR    │  │  OpenAI    │ │
              │  │(Azure/  │  │  Insight   │ │
              │  │ GCloud) │  │  Engine    │ │
              │  └─────────┘  └────────────┘ │
              └──────────────────────────────┘
                         │
                         ▼
              ┌──────────────────┐
              │   CLOUDINARY     │
              │ (Image Storage)  │
              └──────────────────┘
```

---

## 📅 KẾ HOẠCH TRIỂN KHAI (6 PHASES)

### PHASE 0: Project Setup & Infrastructure (Tuần 1)
| # | Task | User Stories | Chi tiết |
|---|------|-------------|----------|
| 0.1 | Init monorepo | - | Tạo NestJS monorepo workspace |
| 0.2 | Setup API Gateway | - | NestJS Gateway module, routing cơ bản |
| 0.3 | Setup Docker | - | Dockerfile cho mỗi service, docker-compose.yml |
| 0.4 | Setup PostgreSQL | - | 3 databases: auth_db, transaction_db, insight_db |
| 0.5 | Setup Prisma ORM | - | Schema cơ bản cho 3 databases |
| 0.6 | Setup RabbitMQ | - | Message queue connection, exchange/queue config |
| 0.7 | Setup CI/CD | - | GitHub Actions: lint → test → build → push Docker Hub |
| 0.8 | Setup Cloudinary | - | Upload/delete image service |

**Deliverable:** Toàn bộ infrastructure chạy được trên Docker, services communicate qua RabbitMQ.

---

### PHASE 1: Auth Service (Tuần 2) — EPIC 5
| # | Task | User Stories | Chi tiết |
|---|------|-------------|----------|
| 1.1 | User entity + migration | US-15 | Table: users (id, email, password, name, created_at) |
| 1.2 | Register endpoint | US-15 | POST /auth/register, hash password (bcrypt) |
| 1.3 | Login endpoint | US-15 | POST /auth/login, return JWT access + refresh token |
| 1.4 | JWT Guard | US-16 | AuthGuard trên Gateway, validate token |
| 1.5 | Refresh token | US-16 | POST /auth/refresh |
| 1.6 | Unit + Integration test | - | Jest test cho auth flow |

**Database Schema - auth_db:**
```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  name        VARCHAR(100),
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);
```

---

### PHASE 2: Transaction Service — Core CRUD (Tuần 3) — EPIC 1 (partial) + EPIC 3
| # | Task | User Stories | Chi tiết |
|---|------|-------------|----------|
| 2.1 | Transaction entity | US-09 | Table: transactions + categories |
| 2.2 | Quick Add (text parse) | US-01 | POST /transactions/quick-add, parse "80k cafe" |
| 2.3 | List transactions | US-09 | GET /transactions, filter by date/category, pagination |
| 2.4 | Edit transaction | US-10 | PUT /transactions/:id |
| 2.5 | Delete transaction | US-11 | DELETE /transactions/:id (soft delete) |
| 2.6 | Category seeding | US-07 | Seed default categories (ăn uống, mua sắm, di chuyển...) |
| 2.7 | Unit + Integration test | - | Jest test cho CRUD flow |

**Database Schema - transaction_db:**
```sql
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL,
  icon        VARCHAR(50),
  color       VARCHAR(7),
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transactions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL,
  amount      BIGINT NOT NULL,
  type        VARCHAR(10) DEFAULT 'expense', -- expense | income
  category_id UUID REFERENCES categories(id),
  note        TEXT,
  image_url   VARCHAR(500),
  source      VARCHAR(20) DEFAULT 'manual', -- manual | ocr | quick_add | share
  is_deleted  BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);
```

---

### PHASE 3: AI Service — OCR & Auto Classification (Tuần 4-5) — EPIC 1 (remaining) + EPIC 2
| # | Task | User Stories | Chi tiết |
|---|------|-------------|----------|
| 3.1 | Image upload to Cloudinary | US-02, US-04 | Upload endpoint, return imageUrl |
| 3.2 | OCR integration | US-05 | Azure Form Recognizer / Google Vision → rawText |
| 3.3 | Amount detection | US-06 | Parse amount từ rawText (regex + rule-based) |
| 3.4 | Auto categorization | US-07 | Text → category + confidence (OpenAI hoặc rule-based) |
| 3.5 | RabbitMQ flow | US-02 | Upload → publish message → AI process → reply |
| 3.6 | Transaction from image | US-02, US-04 | POST /transactions/from-image, preview → confirm → save |
| 3.7 | Share intent handler | US-03 | Receive shared image → AI process → quick confirm |
| 3.8 | Smart suggestions | US-08 | Detect recent images → suggest transactions |
| 3.9 | Unit + Integration test | - | Jest test cho AI flow |

**RabbitMQ Flow:**
```
Transaction Service                    AI Service
     │                                      │
     │── publish: image.process ──────────►│
     │                                      │── OCR extract
     │                                      │── Detect amount
     │                                      │── Classify category
     │◄── publish: image.result ───────────│
     │                                      │
     │── save transaction (draft)           │
```

---

### PHASE 4: Insight Service — Analytics & AI Recommendations (Tuần 6) — EPIC 4
| # | Task | User Stories | Chi tiết |
|---|------|-------------|----------|
| 4.1 | Spending stats | US-12 | GET /insights/stats?month=2026-04, group by category |
| 4.2 | Chart data API | US-12 | Return data format cho pie chart / bar chart |
| 4.3 | Behavior detection | US-13 | Phân tích pattern: % theo category, trend so tuần trước |
| 4.4 | AI recommendation | US-14 | OpenAI generate gợi ý tiết kiệm từ spending data |
| 4.5 | Sync transaction data | - | RabbitMQ: lắng nghe transaction events → sync insight_db |
| 4.6 | Unit + Integration test | - | Jest test cho insight flow |

**Database Schema - insight_db:**
```sql
CREATE TABLE spending_snapshots (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL,
  period      VARCHAR(7) NOT NULL, -- '2026-04'
  category    VARCHAR(100),
  total       BIGINT,
  count       INT,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ai_insights (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL,
  type        VARCHAR(50), -- 'behavior' | 'recommendation'
  content     TEXT NOT NULL,
  period      VARCHAR(7),
  created_at  TIMESTAMP DEFAULT NOW()
);
```

---

### PHASE 5: Integration, Polish & Deploy (Tuần 7-8)
| # | Task | Chi tiết |
|---|------|----------|
| 5.1 | End-to-end testing | Full flow: register → add transaction → view stats |
| 5.2 | Error handling | Global exception filters, validation pipes |
| 5.3 | API documentation | Swagger/OpenAPI cho tất cả endpoints |
| 5.4 | Security hardening | Rate limiting, CORS, helmet, input sanitization |
| 5.5 | Performance optimization | Caching (Redis optional), query optimization |
| 5.6 | Docker compose production | Production-ready compose file |
| 5.7 | Deploy to cloud | VPS / AWS / GCP deployment |
| 5.8 | Monitoring | Health checks, logging aggregation |

---

## 📁 CẤU TRÚC THƯ MỤC ĐỀ XUẤT

```
S.Budget/
├── docker-compose.yml
├── docker-compose.prod.yml
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── apps/
│   ├── api-gateway/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── auth/          (proxy to auth-service)
│   │   │   ├── transactions/  (proxy to transaction-service)
│   │   │   ├── insights/      (proxy to insight-service)
│   │   │   └── common/
│   │   │       ├── guards/
│   │   │       ├── filters/
│   │   │       └── interceptors/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── auth-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   └── dto/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── transaction-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── transaction.module.ts
│   │   │   ├── transaction.controller.ts
│   │   │   ├── transaction.service.ts
│   │   │   ├── parsers/       (quick-add text parser)
│   │   │   ├── categories/
│   │   │   └── dto/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── ai-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── ai.module.ts
│   │   │   ├── ocr/
│   │   │   │   ├── ocr.service.ts
│   │   │   │   └── ocr.controller.ts
│   │   │   ├── classifier/
│   │   │   │   └── classifier.service.ts
│   │   │   ├── amount-detector/
│   │   │   │   └── amount-detector.service.ts
│   │   │   └── cloudinary/
│   │   │       └── cloudinary.service.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── insight-service/
│       ├── src/
│       │   ├── main.ts
│       │   ├── insight.module.ts
│       │   ├── stats/
│       │   ├── behavior/
│       │   ├── recommendation/
│       │   └── dto/
│       ├── prisma/
│       │   └── schema.prisma
│       ├── Dockerfile
│       └── package.json
│
├── libs/
│   └── shared/
│       ├── src/
│       │   ├── dto/
│       │   ├── interfaces/
│       │   ├── constants/
│       │   └── utils/
│       └── package.json
│
└── README.md
```

---

## ⚠️ RISKS & MITIGATION

| Risk | Impact | Mitigation |
|------|--------|------------|
| OCR accuracy thấp | AI parse sai amount/text | Luôn có preview + user confirm trước khi save |
| RabbitMQ complexity | Tăng debug difficulty | Start với sync call, migrate sang async sau |
| Database per service overhead | Phức tạp dev local | docker-compose quản lý tất cả |
| OpenAI cost | Chi phí API cao | Cache insight, rate limit AI calls per user |
| Mobile client chưa xác định | Chưa có frontend | Backend API-first, document Swagger đầy đủ |

---

## ✅ PRIORITY ORDER (theo business value)

1. **P0 (Must have):** US-01, US-09, US-10, US-11, US-15, US-16 → Core CRUD + Auth
2. **P1 (High):** US-02, US-05, US-06, US-07 → AI OCR pipeline
3. **P2 (Medium):** US-03, US-04, US-12 → Share/Camera + Stats
4. **P3 (Nice to have):** US-08, US-13, US-14 → Smart UX + AI Insights
