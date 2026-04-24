# Tổng hợp Dự án S.Budget & Kế hoạch Phát triển

## 1. Nội dung Prompt
> tong hop lai toan bo nhung gi da lam duoc ( xay dung nhung api nao, db gom nhung table nao, ....) , dua ra phuong an xay dung tiep theo , chi tiet tung phan , toi uu nhat 

## 2. Tổng hợp những gì đã làm được

### A. Kiến trúc Hệ thống (Microservices)
Hệ thống được xây dựng theo mô hình Microservices sử dụng **NestJS**, giao tiếp thông qua **RabbitMQ** (Message Broker) và quản lý bằng **Docker Compose**.
- **API Gateway**: Cổng vào duy nhất, điều hướng request đến các service tương ứng.
- **Auth Service**: Quản lý người dùng và xác thực.
- **Transaction Service**: Quản lý thu chi và danh mục.
- **AI Service**: Xử lý OCR hóa đơn và phân loại thông minh.
- **Insight Service**: Phân tích dữ liệu và đưa ra gợi ý tài chính.

### B. Cơ sở dữ liệu (Prisma Models)
Hệ thống sử dụng **PostgreSQL** với 3 database riêng biệt cho các service chính:

1. **Auth DB (`User`)**:
   - `id`, `email`, `password`, `name`, `createdAt`, `updatedAt`.
2. **Transaction DB**:
   - `Category`: `id`, `name`, `icon`, `color`.
   - `Transaction`: `id`, `userId`, `amount`, `type`, `categoryId`, `note`, `imageUrl`, `source`.
3. **Insight DB**:
   - `SpendingSnapshot`: Lưu trữ dữ liệu tổng hợp theo tháng/danh mục.
   - `AiInsight`: Lưu trữ các phân tích hành vi và gợi ý từ AI.

### C. Các API đã định nghĩa (tại API Gateway)
Hiện tại API Gateway đã định nghĩa các route, nhưng logic xử lý tại các Microservice đang ở dạng boilerplate (cần triển khai logic chi tiết):

- **Auth**: `register`, `login`, `refresh`.
- **Transactions**: 
  - CRUD: `POST /`, `GET /` (phân trang/lọc), `GET /:id`, `PUT /:id`, `DELETE /:id`.
  - Tiện ích: `POST /quick-add` (thêm nhanh).
- **Insights**: `GET /stats`, `GET /behavior`, `GET /recommendations`.

---

## 3. Phương án xây dựng tiếp theo (Chi tiết & Tối ưu)

### Giai đoạn 1: Triển khai Logic lõi (Core Business Logic)
1. **Auth Service**:
   - Cài đặt `bcrypt` để mã hóa mật khẩu.
   - Triển khai logic `register` (kiểm tra email trùng) và `login` (so khớp mật khẩu, tạo JWT).
   - Tối ưu: Sử dụng Redis (nếu cần) để quản lý Refresh Token.
2. **Transaction Service**:
   - Triển khai CRUD với Prisma Client.
   - Tối ưu: Sử dụng `Transaction` của Prisma khi tạo giao dịch kèm danh mục mới để đảm bảo tính toàn vẹn dữ liệu.

### Giai đoạn 2: Bảo mật & Shared Library
1. **JWT Guard**:
   - Xây dựng `AuthGuard` dùng chung trong `libs/shared`.
   - Gateway sẽ giải mã JWT và chuyển `userId` vào message gửi đến các service.
2. **Common Filters/Interceptors**:
   - Xử lý lỗi tập trung (Global Exception Filter) để trả về định dạng lỗi đồng nhất cho Client.

### Giai đoạn 3: Tính năng Thông minh (AI & Insight)
1. **AI Service**:
   - Tích hợp **Google Cloud Vision** để đọc Receipt (OCR).
   - Sử dụng **OpenAI (GPT)** để phân loại nội dung hóa đơn vào các `Category` tự động.
2. **Insight Service**:
   - Lắng nghe các Event `TRANSACTION_CREATED` từ RabbitMQ để cập nhật `SpendingSnapshot` theo thời gian thực (Event-driven).
   - Chạy các job định kỳ để phân tích thói quen chi tiêu.

### Giai đoạn 4: Frontend & Mobile
- Xây dựng ứng dụng **React Native** (như kế hoạch ban đầu) để kết nối với API Gateway.

---
**Lời khuyên tối ưu**: Nên bắt đầu ngay với **Giai đoạn 1 (Auth & Transaction)** để có luồng dữ liệu cơ bản, sau đó mới triển khai các tính năng AI phức tạp.
