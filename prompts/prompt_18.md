# Prompt 18

Triển khai Phase 2: AI Service Integration (Quick Add NLP)

Yêu cầu:
1. Xây dựng logic cho `ai-service` để phân tích text tự nhiên (vd: "80k ăn trưa") thành cấu trúc JSON bằng cách gọi OpenAI API.
2. Thêm message pattern `AI_PARSE_TEXT` vào constants.
3. Cập nhật `TransactionGatewayController` tại endpoint `POST /transactions/quick-add`:
   - Chỉ nhận vào `text`.
   - Gọi sang `ai-service` để lấy parsed data.
   - Forward kết quả sang `transaction-service` để lưu vào DB.
4. Đảm bảo cấu trúc code gọn gàng, xử lý lỗi khi AI fail.
