# Result Prompt 4: Trạng thái thiết lập và Danh sách Keys

## Trạng thái cài đặt cơ bản
- ✅ Toàn bộ Phase 0 đã **hoàn thành**.
- Các cấu trúc microservice, Docker, Database, MQ (RabbitMQ) đã sẵn sàng.
- Chỉ cần chạy `docker-compose up` là các Database và Queue sẽ tự động hoạt động.

## Danh sách API Keys cần thay thế
Bạn sẽ thấy 1 file tên là `.env` ở trong thư mục `d:\vibe-coding\S.Budget`. Đây là nơi bạn phải điền các khoá API thật của bạn.

### 1. Bắt buộc phải có để chạy (Core)
* `JWT_SECRET`: Chuỗi khóa bảo mật để mã hoá token đăng nhập. Có thể tự tạo chuỗi ngẫu nhiên. Ví dụ: `my-super-secret-key-123!`.

### 2. Các Key Dịch Vụ AI & Upload
* `GOOGLE_CLOUD_VISION_API_KEY`: API Key của Google Cloud Vision dùng cho tính năng OCR hoá đơn.
* `OPENAI_API_KEY`: API Key của OpenAI (ChatGPT) để AI đưa ra lời khuyên thu/chi, recommend.
* `CLOUDINARY_CLOUD_NAME`: Tên cloud tài khoản Cloudinary để lưu ảnh hoá đơn.
* `CLOUDINARY_API_KEY`: API Key Cloudinary.
* `CLOUDINARY_API_SECRET`: API Secret Cloudinary.

### 3. Setup Môi trường Production (Khi Deploy lên GCP)
Ngoài các key trên, khi bạn deploy hệ thống thật (hoặc chạy GitHub Actions), bạn cần điền các key vào biến secret của GitHub (`Settings > Secrets and variables > Actions`):
* `DOCKER_HUB_USERNAME`: Tên đăng nhập Docker Hub (ví dụ: `nguyenvana`) để auto-build image.
* `DOCKER_HUB_TOKEN`: Token của tài khoản Docker Hub.
* Tuỳ chỉnh Password cho DB bằng cách đổi `sbudget_pass` trong biến `POSTGRES_PASSWORD`.

Để bắt đầu chạy local ngay lúc này (các tính năng CRUD): bạn chưa cần điền các key AI vội, chỉ cần lệnh `docker-compose up -d postgres rabbitmq`.
