# Result Prompt 21

## 1. Mục tiêu
Thực hiện **Phase 5: Integration, Polish & Deploy** (Tích hợp, Hoàn thiện và Bảo mật hệ thống) để chuẩn bị cho môi trường Production.

## 2. Các thay đổi đã thực hiện

- **Fix Routing Bug**:
  - Dời endpoint `GET /transactions/categories` lên trên `GET /transactions/:id` trong `TransactionGatewayController` để tránh việc NestJS nhầm `"categories"` thành một chuỗi ID.

- **Tích hợp Swagger API Documentation**:
  - Cài đặt `@nestjs/swagger` và `swagger-ui-express`.
  - Cấu hình Swagger trong `apps/api-gateway/src/main.ts` với endpoint `/api/docs` để tự động render tài liệu API giao diện đẹp mắt (bao gồm tính năng Bearer Auth).

- **Tăng cường Bảo mật (Security Hardening)**:
  - Cài đặt `helmet` và áp dụng vào `main.ts` của API Gateway để thiết lập các HTTP headers bảo mật (ngăn chặn XSS, Clickjacking, MIME type sniffing, v.v.).
  - Cài đặt `@nestjs/throttler` để cấu hình Rate Limiting toàn cục cho hệ thống (giới hạn 100 requests / phút / IP) nhằm chống spam và DDoS nhẹ. Đăng ký `ThrottlerGuard` tại `api-gateway.module.ts`.

## 3. Kết quả đạt được
- Ứng dụng đã an toàn hơn trước các đợt tấn công từ bên ngoài nhờ Rate Limiting và Helmet.
- Developer hoặc Frontend team có thể xem hướng dẫn toàn bộ API tại link: `http://localhost:3000/api/docs`.
- Các lỗi nhỏ về routing đã được xử lý triệt để.
