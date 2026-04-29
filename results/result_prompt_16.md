# Prompt 16 – JWT Guard & Global Exception Filter (API Gateway)

## Mục tiêu
Bảo mật API Gateway: JWT Guard cho tất cả routes, forward userId sang microservices, chuẩn hóa lỗi API.

---

## 1. Các file đã tạo / cập nhật

| File | Loại | Mô tả |
|------|------|-------|
| `src/decorators/public.decorator.ts` | **Mới** | `@Public()` — bypass JwtAuthGuard |
| `src/decorators/current-user.decorator.ts` | **Mới** | `@CurrentUser()` — extract IJwtPayload từ request |
| `src/guards/jwt-auth.guard.ts` | **Mới** | JwtAuthGuard — verify token, gắn user vào request |
| `src/filters/global-exception.filter.ts` | **Mới** | GlobalExceptionFilter — chuẩn hóa mọi loại lỗi |
| `src/api-gateway.module.ts` | **Sửa** | Đăng ký JwtModule + APP_GUARD global |
| `src/main.ts` | **Sửa** | Thêm `useGlobalFilters(new GlobalExceptionFilter())` |
| `src/controllers/auth.controller.ts` | **Sửa** | Thêm `@Public()` cho register/login/refresh |
| `src/controllers/transaction.controller.ts` | **Sửa** | Thay `TODO_FROM_JWT` → `@CurrentUser()` |
| `src/controllers/insight.controller.ts` | **Sửa** | Thay `TODO_FROM_JWT` → `@CurrentUser()` |

---

## 2. JWT Guard

### Luồng xác thực

```
HTTP Request
    │
    ▼
JwtAuthGuard.canActivate()
    │
    ├─ route có @Public()? → YES → bypass, cho qua
    │
    └─ NO → kiểm tra Authorization: Bearer <token>
                │
                ├─ thiếu token → UnauthorizedException (401)
                │
                └─ có token → jwtService.verify(token, JWT_SECRET)
                                  │
                                  ├─ lỗi → UnauthorizedException (401)
                                  │
                                  └─ ok → gắn payload vào request.user → cho qua
```

### Routes public (bypass guard)
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`

### Routes protected (yêu cầu JWT)
- Tất cả `/api/v1/transactions/*`
- Tất cả `/api/v1/insights/*`

---

## 3. Forward userId vào Microservices

Sau khi JwtAuthGuard verify, payload được gắn vào `request.user`.  
Controller dùng `@CurrentUser()` để lấy, rồi forward `user.sub` (userId) vào message:

```typescript
// Trước (prompt 14):
userId: 'TODO_FROM_JWT'

// Sau (prompt 16):
@CurrentUser() user: IJwtPayload
→ userId: user.sub  // UUID của user từ JWT payload
```

---

## 4. Global Exception Filter

### Cấu trúc response lỗi chuẩn

```json
{
  "statusCode": 401,
  "message": "Access token is invalid or expired",
  "error": "Unauthorized",
  "timestamp": "2025-04-28T05:00:00.000Z",
  "path": "/api/v1/transactions"
}
```

### Các loại exception được xử lý

| Loại | Ví dụ | Xử lý |
|------|-------|-------|
| `HttpException` | `UnauthorizedException`, `NotFoundException` | Lấy statusCode & message trực tiếp |
| `ValidationPipe` errors | Field validation fail | Message array được join thành string |
| RPC Exception từ microservice | `ConflictException` từ Auth Service | Parse JSON string, map statusCode |
| `Error` thông thường | Bug trong code | 500 Internal Server Error |

### Logging
- **5xx errors**: Log `error` level + full stack trace
- **4xx errors**: Log `warn` level + message ngắn

---

## 5. Kết quả kiểm tra

```
npx tsc --noEmit → ✅ 0 errors
```

---

## 6. Ví dụ request/response

### Request không có token → 401
```
GET /api/v1/transactions
→ 401: { statusCode: 401, message: "Access token is missing", error: "Unauthorized", ... }
```

### Request có token hết hạn → 401
```
GET /api/v1/transactions
Authorization: Bearer <expired_token>
→ 401: { statusCode: 401, message: "Access token is invalid or expired", ... }
```

### Request hợp lệ → forward userId
```
POST /api/v1/transactions
Authorization: Bearer <valid_token>
→ Transaction Service nhận: { userId: "uuid-from-jwt", dto: { amount, type, ... } }
```
