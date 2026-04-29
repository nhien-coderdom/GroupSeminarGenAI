Bạn là senior NestJS backend developer. Hãy tiếp tục Phase 1 cho dự án microservices hiện tại.

Yêu cầu triển khai:
- Tạo JWT Guard tại API Gateway để bảo vệ các route cần đăng nhập.
- Decode và verify JWT access token.
- Sau khi xác thực, gắn userId vào request context.
- Khi Gateway gửi message sang các service khác, tự động forward userId vào payload/message.
- Xây dựng Global Exception Filter dùng chung để chuẩn hóa lỗi API.
- Response lỗi cần có cấu trúc: statusCode, message, error, timestamp, path.
- Áp dụng Exception Filter toàn cục trong main.ts.
- Không phá vỡ cấu trúc code hiện tại.
- Viết code theo chuẩn NestJS, TypeScript clean code, dễ mở rộng.