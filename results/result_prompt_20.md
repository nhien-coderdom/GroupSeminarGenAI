# Result Prompt 20

## 1. Mục tiêu
Hoàn thành **Phase 4: Insight Service — Analytics & AI Recommendations (US-12, US-13, US-14)**.
Cho phép người dùng xem thống kê chi tiêu theo tháng, nhận phân tích hành vi và xin lời khuyên tiết kiệm từ AI (OpenAI).

## 2. Các thay đổi đã thực hiện

- **`prompt_20.md`**: Đã tạo prompt mô tả yêu cầu công việc cho Phase 4.
- **`TESTING_GUIDE.md`**: Cập nhật file hướng dẫn thêm Bước 4 để test API Insights.
- **Cấu trúc Insight Service (`apps/insight-service`)**:
  - **`prisma.service.ts`**: Khởi tạo `PrismaClient` kết nối vào `insight_db`.
  - **`insight-service.module.ts`**: Import `ConfigModule`, khởi tạo `ClientsModule` để gọi sang `transaction-service` (lấy dữ liệu chi tiêu) và `ai-service` (mặc dù hiện tại dùng trực tiếp thư viện `openai` cho tiện lợi và tách biệt nghiệp vụ AI Recommendation).
  - **`insight-service.service.ts`**: 
    - Lắng nghe yêu cầu `getStats`, chủ động gọi sang `transaction-service` để kéo list transactions theo tháng, tổng hợp và phân nhóm theo Category.
    - Lưu kết quả vào `spending_snapshots` trong database `insight_db`.
    - Tích hợp `openai` SDK để phân tích thói quen tiêu dùng (`getBehavior`) và đưa ra lời khuyên thiết thực (`getRecommendations`).
    - Lưu lại nội dung phân tích vào bảng `ai_insights`.
  - **`insight-service.controller.ts`**: Khai báo các `@MessagePattern` để nhận RPC request (`INSIGHT_STATS`, `INSIGHT_BEHAVIOR`, `INSIGHT_RECOMMEND`) từ API Gateway.
  - **Khởi động**: Insight Service đã được kết nối lên hệ thống RabbitMQ để bắt đầu lắng nghe request.

## 3. Luồng hoạt động của Insight Service:
1. **Lấy thống kê**: Client gọi `GET /api/v1/insights/stats?month=YYYY-MM` → API Gateway gửi message `INSIGHT_STATS` → Insight Service → Gọi RPC lấy dữ liệu từ Transaction Service → Xử lý phân nhóm tổng tiền → Lưu database `insight_db` → Trả kết quả cho client.
2. **Xin lời khuyên AI**: Client gọi `GET /api/v1/insights/recommendations` → API Gateway gửi message `INSIGHT_RECOMMEND` → Insight Service tự động lấy thống kê tháng hiện tại → Gửi lên OpenAI phân tích → OpenAI trả về 3 lời khuyên → Insight Service lưu cache vào `ai_insights` → Trả kết quả về cho client.
