# Result Prompt 5: Phân tích lỗi Build Docker và Giải pháp

## Danh sách các lỗi phát hiện

### 1. Lỗi Module Resolution (Lỗi build chính)
- **Hiện tượng:** Không thể resolve `@app/shared/constants/index.js`.
- **Nguyên nhân:** Project cấu hình `moduleResolution: nodenext` nhưng trình build Webpack của NestJS không tìm thấy file `.ts` tương ứng khi import có đuôi `.js` trong môi trường monorepo Docker.
- **Vị trí lỗi:** `apps/transaction-service/src/main.ts` và các file service khác.

### 2. Lỗi Cấu hình Nest CLI
- **Hiện tượng:** Webpack tìm kiếm `node_modules` sai vị trí (trong sub-folder thay vì root).
- **Nguyên nhân:** File `nest-cli.json` chứa `tsConfigPath` toàn cục trỏ đến `api-gateway`, gây ảnh hưởng đến việc build các dự án khác.

### 3. Sai lệch cấu hình Môi trường (Environment)
- **Database URL:** `.env` sử dụng `localhost` thay vì tên container (`sbudget-postgres`).
- **Mật khẩu:** Khác biệt giữa `.env` (`sbudget_pass`) và `docker-compose.yml` (`123456`).

### 4. Thiếu Prisma Client
- **Nguyên nhân:** Dockerfile chưa chạy `npx prisma generate`, sẽ gây lỗi khi service khởi chạy.

## Phương án giải quyết

### Bước 1: Sửa cấu hình TypeScript
- Cập nhật `tsconfig.json`: Chuyển `moduleResolution` từ `nodenext` sang `node`.
- Xoá tất cả đuôi `.js` trong các câu lệnh import trong thư mục `apps/` và `libs/`.

### Bước 2: Dọn dẹp Nest CLI
- Loại bỏ `tsConfigPath` toàn cục trong `nest-cli.json` để Nest tự động sử dụng cấu hình riêng của từng project.

### Bước 3: Đồng bộ Docker & Biến môi trường
- Cập nhật `.env`: Thay `localhost` bằng `sbudget-postgres` và `sbudget-rabbitmq`.
- Đồng bộ mật khẩu Postgres trong cả `.env` và `docker-compose.yml`.

### Bước 4: Cập nhật Dockerfile
- Thêm lệnh `RUN npx prisma generate` trước bước build để đảm bảo có đủ thư viện truy vấn database.

---
> [!NOTE]
> Chi tiết kỹ thuật đã được soạn thảo trong [implementation_plan.md](file:///C:/Users/nguye/.gemini/antigravity/brain/a22f23ac-2987-4639-888e-12cfc5aed310/implementation_plan.md)
