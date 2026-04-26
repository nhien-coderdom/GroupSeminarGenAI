# CHƯƠNG 2: CƠ SỞ LÝ THUYẾT

---

## 2.1. Kiến trúc hệ thống

### 2.1.1. Microservices Architecture

**Khái niệm:**

Microservices là một kiểu kiến trúc phần mềm trong đó ứng dụng được phân chia thành nhiều dịch vụ nhỏ, độc lập, mỗi dịch vụ thực hiện một chức năng nghiệp vụ cụ thể và giao tiếp với nhau qua API (thường là REST hoặc Message Queue).

Trong hệ thống S.Budget, các microservice bao gồm:

| Service | Chức năng |
|---------|-----------|
| **Auth Service** | Xử lý đăng ký, đăng nhập, cấp phát và xác thực JWT token |
| **Transaction Service** | Quản lý toàn bộ nghiệp vụ giao dịch tài chính (CRUD) |
| **AI Service** | Nhận ảnh từ người dùng, gọi OCR, trả về kết quả đã phân tích |
| **Insight Service** | Gọi OpenAI API để phân tích hành vi chi tiêu và sinh recommendation |

**Ưu điểm:**
- **Scale độc lập**: Từng service có thể được triển khai và mở rộng tài nguyên riêng biệt theo nhu cầu thực tế mà không ảnh hưởng toàn hệ thống.
- **Dễ maintain**: Mỗi service là một codebase độc lập, dễ kiểm thử, cập nhật và thay thế mà không gây downtime toàn hệ thống.

**Nhược điểm:**
- **Phức tạp hơn Monolith**: Cần quản lý nhiều service, cấu hình mạng, service discovery và distributed tracing, đòi hỏi kinh nghiệm DevOps nhất định.

```typescript
// Ví dụ: Khởi tạo một Microservice trong NestJS
const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  TransactionModule,
  {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'transaction_queue',
    },
  },
);
await app.listen();
```
*Đoạn code trên minh họa cách một Transaction Service lắng nghe message từ RabbitMQ Queue thay vì HTTP trực tiếp, giúp tách biệt hoàn toàn với các service khác.*

---

### 2.1.2. API Gateway

**Khái niệm:**

API Gateway là điểm tiếp nhận duy nhất (single entry point) cho toàn bộ request từ phía client. Thay vì client gọi trực tiếp vào từng microservice, mọi request đều đi qua Gateway để được xử lý tập trung.

Trong S.Budget, API Gateway được xây dựng bằng **NestJS** với các vai trò:

- **Routing request**: Điều hướng request đến đúng microservice tương ứng.
- **Authentication (JWT)**: Xác thực token trước khi cho phép request đi tiếp.
- **Logging**: Ghi lại toàn bộ request/response để phục vụ monitoring và debug.

```typescript
// API Gateway - Guard xác thực JWT
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}

// Controller điều hướng request đến Transaction Service
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class GatewayTransactionController {
  constructor(private readonly client: ClientProxy) {}

  @Post()
  createTransaction(@Body() dto: CreateTransactionDto, @Request() req) {
    return this.client.send('create_transaction', { dto, userId: req.user.id });
  }
}
```
*Guard kiểm tra JWT token trước mỗi request; nếu hợp lệ mới forward sang Transaction Service qua message pattern.*

---

### 2.1.3. Database per Service

**Khái niệm:**

Mỗi microservice sở hữu cơ sở dữ liệu riêng biệt, không chia sẻ schema hay kết nối DB với service khác. Đây là pattern cốt lõi trong kiến trúc Microservices, giúp đảm bảo tính độc lập và tránh coupling.

Trong S.Budget:

| Database | Thuộc service | Dữ liệu quản lý |
|----------|---------------|-----------------|
| `auth_db` | Auth Service | Thông tin tài khoản, refresh token |
| `transaction_db` | Transaction Service | Giao dịch, danh mục, ngân sách |
| `insight_db` | Insight Service | Kết quả phân tích, lịch sử insight |

**Lợi ích**: Khi Transaction Service bị lỗi, Auth Service vẫn hoạt động bình thường. Mỗi service có thể chọn loại database phù hợp nhất với nghiệp vụ (PostgreSQL, MongoDB, Redis...).

---

### 2.1.4. Message Queue (RabbitMQ)

**Khái niệm:**

Message Queue là cơ chế xử lý bất đồng bộ (asynchronous), trong đó producer gửi message vào queue mà không cần chờ consumer xử lý xong. Consumer nhận và xử lý message theo tốc độ riêng.

**Lý do sử dụng trong S.Budget:**

Quá trình OCR và phân tích AI mất nhiều thời gian (1–5 giây). Nếu xử lý đồng bộ, request của người dùng sẽ bị block trong khi chờ. Với RabbitMQ:

```
Upload ảnh → API Gateway → gửi message vào queue
                                    ↓
                             AI Service nhận message
                                    ↓
                        OCR xử lý → lưu kết quả
                                    ↓
                     Notification Service thông báo user
```

```typescript
// Producer: Transaction Service gửi job vào queue
@Injectable()
export class TransactionService {
  constructor(@InjectQueue('ai-processing') private aiQueue: Queue) {}

  async processImage(imageUrl: string, userId: string) {
    await this.aiQueue.add('ocr-job', { imageUrl, userId });
    return { status: 'processing', message: 'Ảnh đang được xử lý' };
  }
}

// Consumer: AI Service xử lý job
@Processor('ai-processing')
export class AiProcessor {
  @Process('ocr-job')
  async handleOcr(job: Job<{ imageUrl: string; userId: string }>) {
    const result = await this.ocrService.extractText(job.data.imageUrl);
    await this.saveTransaction(result, job.data.userId);
  }
}
```
*Producer trả về ngay lập tức sau khi enqueue; Consumer xử lý OCR trong nền, tránh blocking UX của người dùng.*

---

### 2.1.5. AI & OCR

**OCR (Optical Character Recognition):**

OCR là công nghệ nhận dạng và trích xuất văn bản từ ảnh. Trong S.Budget, khi người dùng chụp ảnh hóa đơn, hệ thống gửi ảnh đến **Google Vision API** để trích xuất text, sau đó parse số tiền và mô tả.

```typescript
async extractText(imageBase64: string): Promise<string> {
  const [result] = await this.visionClient.textDetection({
    image: { content: imageBase64 },
  });
  return result.fullTextAnnotation?.text || '';
}
```

**NLP / AI Insight (OpenAI API):**

Sau khi có dữ liệu giao dịch, hệ thống gọi OpenAI API để:
- **Phân tích chi tiêu**: Nhận diện xu hướng, danh mục chi tiêu nhiều nhất.
- **Generate recommendation**: Đưa ra gợi ý cắt giảm chi tiêu phù hợp với hành vi người dùng.

```typescript
async generateInsight(transactions: Transaction[]): Promise<string> {
  const prompt = `Phân tích dữ liệu chi tiêu sau và đưa ra gợi ý tiết kiệm:
  ${JSON.stringify(transactions)}`;

  const response = await this.openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0].message.content;
}
```

---

### 2.1.6. JWT Authentication

**Cách hoạt động:**

JWT (JSON Web Token) là chuẩn xác thực stateless, gồm 3 phần: Header, Payload, Signature.

```
Luồng xác thực:
1. User login → Auth Service xác thực → cấp Access Token (15 phút) + Refresh Token (7 ngày)
2. Client gửi request kèm Authorization: Bearer <token>
3. API Gateway verify token → nếu hợp lệ → forward request đến service tương ứng
4. Token hết hạn → dùng Refresh Token để lấy Access Token mới
```

```typescript
// Tạo JWT token sau khi đăng nhập thành công
async login(user: User) {
  const payload = { sub: user.id, email: user.email, role: user.role };
  return {
    access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
    refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
  };
}
```

---

### 2.1.7. ORM (Prisma)

**Khái niệm ORM:**

ORM (Object-Relational Mapping) là lớp trừu tượng giữa code ứng dụng và cơ sở dữ liệu quan hệ, cho phép thao tác dữ liệu thông qua các object/method thay vì viết SQL thuần.

**Prisma** được chọn trong S.Budget vì:
- **Dễ thao tác DB**: API trực quan, dễ đọc, giảm boilerplate code.
- **Type-safe**: Prisma tự động sinh TypeScript types từ schema, giúp phát hiện lỗi ngay lúc compile.

```typescript
// schema.prisma - Định nghĩa model Transaction
model Transaction {
  id         String   @id @default(cuid())
  amount     Float
  category   String
  note       String?
  createdAt  DateTime @default(now())
  userId     String
  user       User     @relation(fields: [userId], references: [id])
}

// Sử dụng Prisma Client - type-safe, không cần viết SQL
async findByUser(userId: string): Promise<Transaction[]> {
  return this.prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}
```

---

### 2.1.8. Docker & CI/CD

**Docker:**

Docker là nền tảng đóng gói ứng dụng cùng toàn bộ dependencies vào container, đảm bảo môi trường chạy nhất quán từ development đến production.

```dockerfile
# Dockerfile cho một microservice NestJS
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main"]
```

```yaml
# docker-compose.yml - Orchestrate toàn bộ hệ thống
services:
  api-gateway:
    build: ./apps/api-gateway
    ports: ["3000:3000"]
  auth-service:
    build: ./apps/auth-service
  transaction-service:
    build: ./apps/transaction-service
  rabbitmq:
    image: rabbitmq:3-management
    ports: ["5672:5672"]
```

**CI/CD (GitHub Actions):**

```yaml
# .github/workflows/deploy.yml
name: Deploy S.Budget
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker images
        run: docker compose build
      - name: Run tests
        run: docker compose run --rm api-gateway npm test
      - name: Deploy to server
        run: docker compose up -d
```
*Mỗi khi push lên nhánh `main`, GitHub Actions tự động build, test và deploy toàn bộ hệ thống.*

---

## 2.2. Minh họa công nghệ

### 2.2.1. Sơ đồ kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────────┐
│                        Mobile App                           │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway (NestJS)                     │
│          JWT Verify │ Routing │ Rate Limiting │ Logging      │
└──────┬──────────────┬─────────────┬───────────┬─────────────┘
       │              │             │           │
       ▼              ▼             ▼           ▼
  ┌────────┐   ┌──────────────┐ ┌──────┐  ┌─────────┐
  │  Auth  │   │  Transaction │ │  AI  │  │ Insight │
  │Service │   │   Service    │ │Svc   │  │  Svc    │
  └───┬────┘   └──────┬───────┘ └──┬───┘  └────┬────┘
      │               │            │            │
  ┌───┴──┐      ┌─────┴──┐    ┌───┴──┐    ┌────┴───┐
  │auth  │      │transact│    │  -   │    │insight │
  │ _db  │      │ion_db  │    │      │    │  _db   │
  └──────┘      └────────┘    └──────┘    └────────┘
                         ↑
              ┌──────────┴──────────┐
              │   RabbitMQ Queue    │
              └─────────────────────┘
```

### 2.2.2. User Story

| ID | Vai trò | Mục tiêu | Lợi ích |
|----|---------|----------|---------|
| US-01 | Người dùng | Nhập chi tiêu bằng text tự nhiên | Ghi nhận nhanh, không cần nhiều thao tác |
| US-02 | Người dùng | Chụp ảnh hóa đơn để nhập tự động | Tiết kiệm thời gian, giảm sai sót |
| US-03 | Người dùng | Xem thống kê chi tiêu theo tháng | Hiểu rõ thói quen tài chính |
| US-04 | Người dùng | Nhận gợi ý tiết kiệm từ AI | Cải thiện hành vi chi tiêu |
| US-05 | Người dùng | Đăng nhập an toàn | Bảo vệ dữ liệu tài chính cá nhân |

### 2.2.3. Use Case Diagram (mô tả)

**Actor chính**: Người dùng (User)

**Các Use Case:**
- Đăng ký / Đăng nhập tài khoản
- Thêm giao dịch (text hoặc ảnh)
- Xem danh sách giao dịch
- Lọc/tìm kiếm giao dịch
- Xem báo cáo & biểu đồ chi tiêu
- Nhận insight tài chính từ AI

### 2.2.4. Component Diagram (mô tả)

```
[Mobile App]
    └── [API Gateway Component]
            ├── [AuthModule] ──────► [Auth Service]
            ├── [TransactionModule] ► [Transaction Service]
            ├── [AIModule] ─────────► [AI Service] ──► [Google Vision API]
            └── [InsightModule] ───► [Insight Service] ► [OpenAI API]
```

### 2.2.5. Database Design

**auth_db** – Auth Service
```sql
Table users {
  id         String  PK
  email      String  UNIQUE
  password   String  (hashed bcrypt)
  createdAt  DateTime
}
Table refresh_tokens {
  id        String  PK
  token     String
  userId    String  FK → users.id
  expiresAt DateTime
}
```

**transaction_db** – Transaction Service
```sql
Table transactions {
  id        String  PK
  userId    String
  amount    Float
  category  String
  note      String
  imageUrl  String  (nullable)
  createdAt DateTime
}
Table categories {
  id    String PK
  name  String
  icon  String
}
```

**insight_db** – Insight Service
```sql
Table insights {
  id          String  PK
  userId      String
  content     Text
  period      String  (e.g. "2025-04")
  generatedAt DateTime
}
```

### 2.2.6. Data Flow Diagram (DFD)

```
Level 0 – Context Diagram:
[Người dùng] ──nhập chi tiêu/ảnh──► [S.Budget System] ──► [Báo cáo & Insight]

Level 1 – Main Processes:
[Người dùng]
    │
    ├─ text input ─► [1. Xử lý nhập liệu] ─► transaction_db
    │
    ├─ image upload ► [2. OCR Processing] ──► Google Vision ──► [1.]
    │
    └─ xem báo cáo ► [3. Phân tích & Insight] ─► OpenAI ─► [Insight]
```

---

## 2.3. Ứng dụng tham khảo

### 2.3.1. Money Lover

**Giới thiệu**: Ứng dụng quản lý tài chính cá nhân phổ biến tại Việt Nam và Đông Nam Á, phát triển bởi Finsify.

| Tiêu chí | Đánh giá |
|----------|----------|
| **Ưu điểm** | Giao diện thân thiện, hỗ trợ nhiều ví, đồng bộ đa thiết bị, có báo cáo chi tiết |
| **Hạn chế** | Không có tính năng AI tự động nhập liệu, nhập thủ công nhiều bước |
| **Bài học** | Thiết kế danh mục chi tiêu linh hoạt; UX tối giản là yếu tố giữ chân người dùng |

### 2.3.2. Spendee

**Giới thiệu**: Ứng dụng quản lý ngân sách cá nhân và nhóm với thiết kế hiện đại, hỗ trợ kết nối tài khoản ngân hàng.

| Tiêu chí | Đánh giá |
|----------|----------|
| **Ưu điểm** | Kết nối ngân hàng tự động, giao diện đẹp, hỗ trợ quản lý chi tiêu nhóm |
| **Hạn chế** | Tính năng nâng cao yêu cầu trả phí, không có AI insight cá nhân hóa |
| **Bài học** | Tự động hóa nhập liệu từ ngân hàng giảm đáng kể ma sát; tính năng nhóm tăng giá trị sản phẩm |

### 2.3.3. CapMoney

**Giới thiệu**: Ứng dụng quản lý tài chính cá nhân của Việt Nam, nổi bật với tính năng scan hóa đơn và nhập liệu tự động.

| Tiêu chí | Đánh giá |
|----------|----------|
| **Ưu điểm** | Có tính năng scan hóa đơn bằng camera, giao diện tiếng Việt thân thiện |
| **Hạn chế** | OCR còn hạn chế với hóa đơn phức tạp, thiếu AI insight phân tích sâu |
| **Bài học** | OCR là tính năng nổi bật tạo khác biệt; cần kết hợp với NLP để nâng cao độ chính xác |

### Bảng so sánh tổng hợp

| Tiêu chí | Money Lover | Spendee | CapMoney | **S.Budget** |
|----------|------------|---------|----------|-------------|
| Nhập text tự nhiên | ❌ | ❌ | ❌ | ✅ |
| OCR scan hóa đơn | ❌ | ❌ | ✅ (cơ bản) | ✅ (Google Vision) |
| AI Insight cá nhân | ❌ | ❌ | ❌ | ✅ (OpenAI) |
| Kiến trúc Microservices | ❌ | ❌ | ❌ | ✅ |
| Mã nguồn mở / học thuật | ❌ | ❌ | ❌ | ✅ |

---

*Chương tiếp theo sẽ trình bày thiết kế chi tiết hệ thống và phân tích yêu cầu phần mềm.*
