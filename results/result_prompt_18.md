# Result Prompt 18

## 1. Mục tiêu
Triển khai Phase 2: AI Service Integration cho chức năng "Quick Add bằng text tự nhiên" (US-01).

## 2. Các thay đổi đã thực hiện
- **Cài đặt thư viện**: Thêm `openai` vào dự án S.Budget.
- **`libs/shared/src/constants/index.ts`**: Thêm pattern `AI_PARSE_TEXT`.
- **`apps/api-gateway/src/controllers/transaction.controller.ts`**: Cập nhật endpoint `POST /transactions/quick-add`. Thay vì nhận DTO sẵn, bây giờ nhận `text` gốc, gọi `ai-service` phân tích, lấy kết quả DTO và chuyển cho `transaction-service` để lưu DB.
- **`apps/ai-service/src/ai-service.module.ts`**: Cấu hình `ConfigModule` để đọc biến môi trường `OPENAI_API_KEY`.
- **`apps/ai-service/src/ai-service.controller.ts`**: Thêm `@MessagePattern(MESSAGE_PATTERNS.AI_PARSE_TEXT)` để nhận lệnh phân tích văn bản qua RabbitMQ.
- **`apps/ai-service/src/ai-service.service.ts`**: Triển khai `parseTextToTransaction` sử dụng OpenAI API. Prompt được thiết kế để trả về chuẩn JSON `amount`, `categoryName`, `type` và `note`. Xử lý lỗi `RpcException` khi quá trình parse thất bại.

## 3. Luồng hoạt động Quick Add Text:
Client `POST { "text": "80k cafe sáng" }` -> API Gateway -> RabbitMQ (`AI_PARSE_TEXT`) -> AI Service -> Gọi OpenAI API -> Nhận kết quả JSON -> API Gateway -> RabbitMQ (`TRANSACTION_QUICK_ADD`) -> Transaction Service -> Lưu DB -> Trả về Client.
