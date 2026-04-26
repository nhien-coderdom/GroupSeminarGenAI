# prompt 14
Role: Bạn là một chuyên gia về kiến trúc phần mềm và là người hướng dẫn viết luận văn tốt nghiệp ngành Công nghệ thông tin.

Context: Tôi đang thực hiện đồ án "Hệ thống quản lý tài chính cá nhân thông minh". Tôi cần bạn viết chi tiết nội dung cho Chương 2: Cơ sở lý thuyết dựa trên dàn ý đã có. Hệ thống của tôi sử dụng kiến trúc Microservices, NestJS, tích hợp AI (OCR và NLP) để tự động hóa việc nhập liệu và phân tích chi tiêu.

Task: Hãy soạn thảo nội dung cho các mục sau:
Chương 2 : Cơ sở lý thuyết
2.1. Kiến trúc hệ thống
2.1.1. Microservices Architecture
   Khái niệm :
 Auth Service 
 Transaction Service 
 AI Service 
 Insight Service
   Ưu điểm: 
 Scale độc lập 
 Dễ maintain 
   Nhược điểm: 
 Phức tạp hơn monolith
2.1.2 API Gateway
   Khái niệm: entry point cho client 
   NestJS Gateway
   Vai trò: 
 Routing request 
 Authentication (JWT) 
 Logging 
2.1.3. Database per Service
   Mỗi service có DB riêng 
   Tránh coupling 
 auth_db 
 transaction_db 
 insight_db 
2.1.4. Message Queue (RabbitMQ)
   Khái niệm: xử lý bất đồng bộ 
   Lý do dùng: 
 AI xử lý lâu --> không block request
   Upload ảnh --> gửi message --> AI xử lý --> trả kết quả 
2.1.5. AI & OCR
OCR
   Khái niệm: nhận dạng text từ ảnh 
   Công nghệ: 
 Google Vision 
NLP / AI Insight
   Dùng API (OpenAI) 
   Chức năng: 
 Phân tích chi tiêu 
 Generate recommendation 
2.1.6. JWT Authentication
   Cách hoạt động: 
 Login --> cấp token 
 Request --> verify token 
   Dùng trong API Gateway
2.1.7. ORM (Prisma)
   Khái niệm ORM 
   Lợi ích: 
 Dễ thao tác DB 
 Type-safe
2.1.8. Docker & CI/CD
   Docker: 
 Đóng gói service 
   CI/CD: 
 GitHub Actions 
 Deploy tự động
2.2. Minh họa công nghệ 
2.2.1. Sơ đồ kiến trúc tổng thể
2.2.2. User Story
2.2.3. Use Case Diagram
2.2.4. Component Diagram
2.2.5. Database Design
2.2.6 Data Flow Diagram (DFD)
2.3. Ứng dụng tham khảo 
2.3.1. Money Lover
2.3.2. Spendee
2.3.3. CapMoney