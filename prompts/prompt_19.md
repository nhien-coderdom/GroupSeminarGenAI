# Prompt 19

Triển khai Phase 3: Image Upload & OCR (US-02, US-05, US-06)

Yêu cầu:
1. Tích hợp Cloudinary:
   - Cài đặt `cloudinary` và `multer`.
   - Viết logic upload ảnh buffer lên Cloudinary để lấy `imageUrl`.
2. API Gateway:
   - Tạo endpoint `POST /transactions/upload-image` sử dụng `FileInterceptor` của NestJS.
   - Khi nhận file ảnh, API Gateway upload lên Cloudinary.
   - Sau đó gửi `imageUrl` sang `ai-service` qua pattern `AI_OCR_PROCESS`.
   - Lấy kết quả từ `ai-service` và gọi tiếp `TRANSACTION_QUICK_ADD` (hoặc trả về cho client confirm tuỳ luồng).
3. AI Service (OCR):
   - Nhận `imageUrl` từ RabbitMQ.
   - Sử dụng OpenAI Vision (hoặc dịch vụ tương đương) để đọc hóa đơn/ảnh chụp màn hình và bóc tách: số tiền (amount), phân loại (categoryName), ghi chú (note).
4. Kết quả: User upload ảnh hoá đơn, hệ thống tự lưu giao dịch.
