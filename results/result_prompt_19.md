# Result Prompt 19

## 1. Mục tiêu
Triển khai Phase 3: Image Upload & OCR (US-02, US-05, US-06). Xây dựng luồng tải ảnh và AI tự động đọc hóa đơn.

## 2. Các thay đổi đã thực hiện
- **Cài đặt thư viện**: Thêm `cloudinary`, `multer`, `streamifier` vào dự án.
- **`CloudinaryService`**: Tạo mới service trong `api-gateway` để upload ảnh an toàn bằng luồng stream (không lưu file vật lý trên server).
- **`TransactionGatewayController`**: 
  - Thêm endpoint `POST /transactions/upload-image`.
  - Sử dụng `@UseInterceptors(FileInterceptor('file'))` để parse form-data.
  - Sau khi upload lên Cloudinary, gửi `imageUrl` sang `ai-service`.
  - Nhận kết quả từ AI, tạo `QuickAddDto` gửi tiếp sang `transaction-service` để tự động lưu vào Database với link ảnh được đính kèm.
- **`AiServiceController` & `AiServiceService`**:
  - Lắng nghe message `AI_OCR_PROCESS`.
  - Dùng OpenAI Vision (`gpt-4o`) để phân tích hình ảnh từ URL. Model sẽ tự đọc chữ trên hình (OCR), tìm số tiền (amount) và tên danh mục (categoryName) trả về bằng chuỗi JSON.

## 3. Luồng hoạt động Upload Image:
Client `POST /transactions/upload-image` (form-data: file) -> API Gateway -> Upload lên Cloudinary -> Nhận `imageUrl` -> Gửi RabbitMQ (`AI_OCR_PROCESS`) -> AI Service -> Gọi GPT-4 Vision phân tích hình ảnh -> API Gateway -> Gửi RabbitMQ (`TRANSACTION_QUICK_ADD`) -> Transaction Service -> Lưu DB cùng với `imageUrl` -> Trả về kết quả giao dịch.
