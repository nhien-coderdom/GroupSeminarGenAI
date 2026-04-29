(nho luu lai prompt va result vao folder tuong ung )

Triển khai Logic lõi (Core Business Logic)
1. **Auth Service**:
   - Cài đặt `bcrypt` để mã hóa mật khẩu.
   - Triển khai logic `register` (kiểm tra email trùng) và `login` (so khớp mật khẩu, tạo JWT).
   - Tối ưu: Sử dụng Redis (nếu cần) để quản lý Refresh Token.
2. **Transaction Service**:
   - Triển khai CRUD với Prisma Client.
   - Tối ưu: Sử dụng `Transaction` của Prisma khi tạo giao dịch kèm danh mục mới để đảm bảo tính toàn vẹn dữ liệu.

