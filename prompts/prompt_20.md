# Prompt 20

Tiến hành Phase 4: Insight Service — Analytics & AI Recommendations (US-12, US-13, US-14)

Yêu cầu thực hiện:
1. **Cấu hình Prisma Insight DB:**
   - Đã có sẵn schema cho `insight_db` chưa? Nếu chưa, định nghĩa bảng `spending_snapshots` và `ai_insights`.
   - Chạy `npx prisma db push` cho `insight-service`.
2. **Sync Transaction Data (Sự kiện qua RabbitMQ):**
   - Khi có giao dịch mới tạo/xóa bên `transaction-service`, publish một message (ví dụ: `TRANSACTION_CREATED`, `TRANSACTION_DELETED`).
   - `insight-service` lắng nghe các sự kiện này để cập nhật/lưu trữ dữ liệu thống kê vào bảng `spending_snapshots`.
3. **Thống kê chi tiêu (US-12):**
   - API `GET /insights/stats?month=YYYY-MM` (đặt tại `api-gateway` gọi sang `insight-service`).
   - Trả về tổng chi tiêu trong tháng, chia theo từng Category.
4. **AI Recommendation (US-14) & Behavior Detection (US-13):**
   - Lấy tổng hợp dữ liệu chi tiêu của tháng (ví dụ: Ăn uống 3 triệu, Giải trí 2 triệu).
   - Truyền dữ liệu này sang OpenAI (gọi sang `ai-service` hoặc gọi trực tiếp từ `insight-service` tuỳ kiến trúc hiện tại) để nhận lại nhận xét (Insight) và gợi ý tiết kiệm (Recommendation).
   - Lưu lại gợi ý vào bảng `ai_insights` để cache.
   - API `GET /insights/recommendations` để client lấy các AI insights.

Hãy bắt đầu viết code cho các tính năng trên.
