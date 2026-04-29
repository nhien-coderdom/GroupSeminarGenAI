# Prompt 15 – Triển khai Core Business Logic

## Mục tiêu
Triển khai logic nghiệp vụ lõi cho **Auth Service** (bcrypt, register/login, JWT) và **Transaction Service** (CRUD với Prisma Transaction).

---

## 1. Auth Service

### Các file đã tạo / cập nhật

| File | Mô tả |
|------|-------|
| `apps/auth-service/src/prisma.service.ts` | PrismaService extend `PrismaClient` từ `.prisma/auth-client` |
| `apps/auth-service/src/auth-service.service.ts` | Core logic: register, login, validateToken, refreshToken |
| `apps/auth-service/src/auth-service.controller.ts` | MessagePattern handlers (RabbitMQ RPC) |
| `apps/auth-service/src/auth-service.module.ts` | Module tích hợp JwtModule + PrismaService |
| `apps/auth-service/src/auth-service.controller.spec.ts` | Unit test spec cập nhật |

### Logic chính

#### `register(dto: RegisterDto)`
1. Kiểm tra email trùng → `ConflictException` nếu đã tồn tại
2. Hash mật khẩu bằng `bcrypt` (10 rounds)
3. Tạo user mới trong DB
4. Trả về user đã sanitize (không có trường `password`)

#### `login(dto: LoginDto)`
1. Tìm user theo email → `UnauthorizedException` nếu không tồn tại
2. So khớp mật khẩu với `bcrypt.compare()`
3. Tạo **Access Token** (15 phút, ký bằng `JWT_SECRET`)
4. Tạo **Refresh Token** (7 ngày, ký bằng `JWT_REFRESH_SECRET`)

#### `validateToken(token)` – dùng bởi API Gateway
- Verify JWT bằng `JWT_SECRET`, trả về payload (`IJwtPayload`)

#### `refreshToken(token)`
- Verify Refresh Token → xác nhận user vẫn tồn tại → cấp cặp token mới

---

## 2. Transaction Service

### Các file đã tạo / cập nhật

| File | Mô tả |
|------|-------|
| `apps/transaction-service/src/prisma.service.ts` | PrismaService extend `PrismaClient` từ `.prisma/transaction-client` |
| `apps/transaction-service/src/transaction-service.service.ts` | CRUD đầy đủ + Prisma Transaction |
| `apps/transaction-service/src/transaction-service.controller.ts` | MessagePattern handlers |
| `apps/transaction-service/src/transaction-service.module.ts` | Module đăng ký providers |
| `apps/transaction-service/src/transaction-service.controller.spec.ts` | Unit test spec cập nhật |

### Logic chính

#### `create(userId, dto)` — Prisma Transaction
- Nếu `categoryName` được truyền (không có `categoryId`): tạo category mới **trong cùng `$transaction`** để đảm bảo tính toàn vẹn dữ liệu.
- `amount` lưu dưới dạng `BigInt` (PostgreSQL), convert sang `number` khi trả về.

#### `quickAdd(userId, dto)` — Prisma Transaction
- Tìm category theo tên, tạo mới trong cùng tx nếu chưa tồn tại.
- Source mặc định là `'quick_add'`.

#### `findAll(userId, query)`
- Phân trang (`page`, `limit`)
- Lọc theo `type`, `categoryId`, `startDate`, `endDate`
- Dùng `prisma.$transaction([findMany, count])` để lấy data + total cùng lúc

#### `findOne`, `update`, `remove`
- Soft-delete (`isDeleted: true`) thay vì xóa cứng
- `findOne` kiểm tra quyền sở hữu (`userId`)

---

## 3. Shared DTO cập nhật

**`libs/shared/src/dto/quick-add.dto.ts`** — Mở rộng với các field:
- `text` (string, bắt buộc) – text gốc người dùng
- `amount` (number, bắt buộc) – số tiền đã parse
- `type` (optional) – expense | income
- `categoryName` (optional) – tên danh mục
- `note` (optional) – ghi chú

---

## 4. Prisma Clients Generated

```bash
npx prisma generate --schema=apps/auth-service/prisma/schema.prisma
# → .prisma/auth-client

npx prisma generate --schema=apps/transaction-service/prisma/schema.prisma
# → .prisma/transaction-client
```

---

## 5. Kết quả kiểm tra

```
npx tsc --noEmit -p tsconfig.json → ✅ 0 errors
```

---

## 6. Biến môi trường cần thêm vào `.env`

```env
# Auth Service
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here

# Database
AUTH_DATABASE_URL=postgresql://user:pass@localhost:5432/auth_db
TRANSACTION_DATABASE_URL=postgresql://user:pass@localhost:5432/transaction_db
```
