# Prompt 17 – RpcException + Seed Categories + Category API

## Mục tiêu (Option A – Hoàn thiện Phase 1)
1. Chuẩn hóa luồng lỗi end-to-end: microservice → RabbitMQ → Gateway → client
2. Seed 11 danh mục mặc định khi Transaction Service khởi động
3. Thêm `GET /api/v1/transactions/categories` để client lấy danh mục

---

## 1. Các file đã tạo / cập nhật

| File | Loại | Mô tả |
|------|------|-------|
| `libs/shared/src/filters/all-rpc-exceptions.filter.ts` | **Mới** | Filter dùng chung: HttpException → RpcException JSON |
| `libs/shared/src/index.ts` | **Sửa** | Export filter từ shared lib |
| `libs/shared/src/constants/index.ts` | **Sửa** | Thêm `CATEGORY_FIND_ALL` message pattern |
| `apps/auth-service/src/main.ts` | **Sửa** | Áp `AllRpcExceptionsFilter` global |
| `apps/transaction-service/src/main.ts` | **Sửa** | Áp filter + gọi `seedDefaultCategories()` on startup |
| `apps/transaction-service/src/transaction-service.service.ts` | **Sửa** | Fix bug `seedDefaultCategories` (upsert → findFirst+create) |
| `apps/transaction-service/src/transaction-service.controller.ts` | **Sửa** | Thêm `CATEGORY_FIND_ALL` handler |
| `apps/api-gateway/src/filters/global-exception.filter.ts` | **Sửa** | Thêm branch xử lý plain object từ RPC |
| `apps/api-gateway/src/controllers/transaction.controller.ts` | **Sửa** | Thêm `GET /categories` (@Public) |

---

## 2. Luồng lỗi end-to-end hoàn chỉnh

```
Auth/Transaction Service throws ConflictException("Email already in use")
    │
    ▼
AllRpcExceptionsFilter.catch()
    │  Chuyển → RpcException('{"statusCode":409,"message":"Email already in use"}')
    │
    ▼ (qua RabbitMQ)
API Gateway firstValueFrom() throws Error(...)
    │
    ▼
GlobalExceptionFilter.catch()
    │  Parse JSON từ exception.message hoặc exception object
    │
    ▼
HTTP Response 409:
{
  "statusCode": 409,
  "message": "Email already in use",
  "error": "Conflict",
  "timestamp": "2025-04-28T...",
  "path": "/api/v1/auth/register"
}
```

---

## 3. Seed Default Categories

Khi Transaction Service khởi động, `seedDefaultCategories()` chạy tự động:
- Kiểm tra từng trong 11 danh mục mặc định
- Chỉ tạo nếu chưa tồn tại (`findFirst` → `create`)
- Bọc trong try/catch: không crash nếu DB chưa sẵn sàng

**11 danh mục mặc định:**
Ăn uống 🍜 | Di chuyển 🚗 | Mua sắm 🛍️ | Giải trí 🎬 | Sức khỏe 💊 |
Giáo dục 📚 | Tiện ích 💡 | Nhà ở 🏠 | Cafe/Đồ uống ☕ | Thu nhập 💰 | Khác 📋

---

## 4. Category API

| Method | Route | Auth | Mô tả |
|--------|-------|------|-------|
| `GET` | `/api/v1/transactions/categories` | ❌ Public | Lấy danh sách tất cả danh mục |

**Response mẫu:**
```json
[
  { "id": "uuid", "name": "Ăn uống", "icon": "🍜", "color": "#FF6B6B", "createdAt": "..." },
  { "id": "uuid", "name": "Di chuyển", "icon": "🚗", "color": "#4ECDC4", "createdAt": "..." }
]
```

---

## 5. Kết quả kiểm tra

```
npx tsc --noEmit → ✅ 0 errors
```

---

## 6. Bảng API hoàn chỉnh (sau prompt 17)

| Method | Route | Auth | Service |
|--------|-------|------|---------|
| POST | `/auth/register` | ❌ | Auth |
| POST | `/auth/login` | ❌ | Auth |
| POST | `/auth/refresh` | ❌ | Auth |
| GET | `/transactions/categories` | ❌ | Transaction |
| POST | `/transactions` | ✅ | Transaction |
| POST | `/transactions/quick-add` | ✅ | Transaction |
| GET | `/transactions` | ✅ | Transaction |
| GET | `/transactions/:id` | ✅ | Transaction |
| PUT | `/transactions/:id` | ✅ | Transaction |
| DELETE | `/transactions/:id` | ✅ | Transaction |
| GET | `/insights/stats` | ✅ | Insight |
| GET | `/insights/behavior` | ✅ | Insight |
| GET | `/insights/recommendations` | ✅ | Insight |
