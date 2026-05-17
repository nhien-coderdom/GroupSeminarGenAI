# Prompt 28: Database Seeding for Microservices

## Objective
Xây dựng hệ thống Database Seeding cho toàn bộ backend microservices của S.Budget (auth, transaction, ai, insight) để cung cấp dữ liệu giả lập (mock data) thực tế và đồng nhất (production-like), giúp việc test giữa các service và frontend/mobile-app thuận tiện hơn.

## Scope of Work
1. **Khởi tạo thư mục `database_seed/`:** Tạo thư mục chung tại `S.Budget/database_seed/`.
2. **Xây dựng Script Seed cho từng Service:**
   - **Auth Service:** Seed accounts (User) với email/password đã được băm.
   - **Transaction Service:** Seed danh mục (Category) và giao dịch mẫu (Transaction) liên kết với User ID.
   - **AI Service:** Cấu hình dummy seed (nếu không có DB).
   - **Insight Service:** Seed dữ liệu thống kê (SpendingSnapshot) và AI Insights (AiInsight) liên kết với User ID.
3. **Tính chất Idempotent:**
   - Code seed phải an toàn khi chạy nhiều lần (sử dụng `upsert` hoặc kiểm tra existence trước khi `create`).
4. **Integration Command:**
   - Thêm câu lệnh `npm run seed` vào `package.json` của S.Budget để có thể kích hoạt toàn bộ luồng seed dễ dàng.

## Technical Requirements
- Sử dụng TypeScript.
- Kết nối thông qua các Prisma Clients đã được sinh ra (`.prisma/auth-client`, `.prisma/transaction-client`, v.v.).
- Tạo các mock UUIDs (cố định) để liên kết data giữa các database phân tán (Microservices không dùng chung DB).

## Acceptance Criteria
- Chạy lệnh `npm run seed` thành công mà không có lỗi.
- Database của các microservice được tự động điền dữ liệu đúng quan hệ (Dùng chung User UUID).
- Chạy lệnh seed nhiều lần không sinh ra dòng trùng lặp ngoài ý muốn.
