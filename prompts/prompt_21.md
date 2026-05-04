# Prompt 21

Tiến hành Phase 5: Integration, Polish & Deploy (Hoàn thiện và Bảo mật)

Yêu cầu thực hiện:
1. **Fix Routing Bug**:
   - Chuyển route `@Get('categories')` lên trên `@Get(':id')` trong `TransactionGatewayController` để tránh việc NestJS nhầm chuỗi "categories" thành tham số `:id`.
2. **API Documentation (Swagger)**:
   - Cài đặt thư viện `@nestjs/swagger` và `swagger-ui-express`.
   - Cấu hình Swagger trong `apps/api-gateway/src/main.ts`.
   - Thêm decorator `@ApiTags`, `@ApiOperation`, `@ApiResponse`, `@ApiBearerAuth` cho các controller của `api-gateway` (Auth, Transaction, Insight) để tự động generate tài liệu API xịn xò.
3. **Security Hardening**:
   - Cài đặt thư viện `helmet` và `@nestjs/throttler` (Rate Limiting).
   - Tích hợp Helmet vào `main.ts` của API Gateway để bảo vệ HTTP headers.
   - Cấu hình `ThrottlerModule` trong `api-gateway.module.ts` để chống spam API (ví dụ: tối đa 100 requests / phút).
