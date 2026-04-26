# CHƯƠNG 1: TỔNG QUAN ĐỀ TÀI

---

## 1.1. Bối cảnh & Lý do chọn đề tài

### 1.1.1. Vấn đề thực tế

Trong bối cảnh kinh tế hiện đại, quản lý tài chính cá nhân đóng vai trò ngày càng quan trọng đối với mọi tầng lớp người dùng. Tuy nhiên, thực tế cho thấy phần lớn người dùng vẫn gặp phải những rào cản đáng kể trong việc theo dõi và kiểm soát chi tiêu hàng ngày.

**Thứ nhất**, việc ghi chép chi tiêu thủ công đặt ra yêu cầu cao về tính kỷ luật và thói quen của người dùng. Thao tác lặp lại mỗi ngày dễ gây nhàm chán và dẫn đến bỏ cuộc sau thời gian ngắn. Theo nhiều khảo sát hành vi người dùng, hơn 70% người dùng ngừng sử dụng ứng dụng quản lý chi tiêu sau chưa đầy một tháng.

**Thứ hai**, do đặc tính bận rộn của cuộc sống hiện đại, người dùng thường quên nhập giao dịch ngay sau khi phát sinh. Các khoản chi tiêu nhỏ — như cà phê, ăn sáng, phí gửi xe — tuy nhỏ nhưng tích lũy theo thời gian tạo ra sai lệch đáng kể trong bức tranh tài chính tổng thể.

**Thứ ba**, hầu hết ứng dụng quản lý chi tiêu hiện tại yêu cầu người dùng trải qua nhiều bước nhập liệu: chọn danh mục → nhập số tiền → chọn ngày → thêm ghi chú → lưu. Luồng thao tác phức tạp này tạo ra trải nghiệm người dùng (UX) kém, làm giảm tỷ lệ tương tác và gắn kết lâu dài.

### 1.1.2. Xu hướng công nghệ

Song song với các vấn đề trên, sự bùng nổ của công nghệ trí tuệ nhân tạo (AI) và kiến trúc phần mềm hiện đại mở ra cơ hội lớn để xây dựng giải pháp vượt trội:

- **AI (OCR & NLP)**: Công nghệ nhận dạng ký tự quang học (Optical Character Recognition – OCR) và xử lý ngôn ngữ tự nhiên (Natural Language Processing – NLP) cho phép hệ thống tự động đọc, phân tích và phân loại giao dịch từ văn bản hoặc hình ảnh mà không cần người dùng thao tác thủ công.
- **Kiến trúc Microservices**: Mô hình kiến trúc phần mềm này cho phép chia hệ thống thành các dịch vụ độc lập, dễ mở rộng (scalable), dễ bảo trì và triển khai linh hoạt theo nhu cầu thực tế.

Từ những vấn đề thực tiễn và cơ hội công nghệ nêu trên, nhóm đề xuất xây dựng **S.Budget** — một hệ thống quản lý tài chính cá nhân thông minh tích hợp AI và kiến trúc Microservices, hướng đến trải nghiệm người dùng đơn giản, nhanh chóng và thông minh.

---

## 1.2. Mục tiêu đề tài

### 1.2.1. Mục tiêu chính

Xây dựng hệ thống **S.Budget** — một ứng dụng quản lý tài chính cá nhân thông minh, cho phép người dùng ghi nhận, theo dõi và phân tích chi tiêu một cách tự động, trực quan và hiệu quả thông qua tích hợp công nghệ AI và kiến trúc Microservices.

### 1.2.2. Mục tiêu cụ thể

Dựa trên các user stories được thu thập từ khảo sát người dùng thực tế, hệ thống cần đáp ứng các mục tiêu cụ thể sau:

| STT | Nhóm chức năng | Mục tiêu cụ thể |
|-----|----------------|-----------------|
| 1 | **Ghi nhận giao dịch** | Cho phép nhập liệu bằng văn bản tự nhiên (ví dụ: *"80k cafe"*) hoặc tải lên ảnh/screenshot hóa đơn |
| 2 | **AI tự động hóa** | OCR đọc và trích xuất nội dung từ ảnh; NLP nhận diện số tiền và phân loại danh mục chi tiêu tự động |
| 3 | **Phân tích tài chính** | Cung cấp thống kê chi tiêu theo thời gian và sinh ra insight tài chính cá nhân hóa cho từng người dùng |
| 4 | **Bảo mật & khả năng mở rộng** | Đảm bảo xác thực người dùng an toàn (JWT) và hệ thống có thể mở rộng linh hoạt theo kiến trúc Microservices |

---

## 1.3. Phạm vi hệ thống

### 1.3.1. Phạm vi đề tài (In Scope)

Đề tài tập trung nghiên cứu và xây dựng các thành phần sau:

- **Mobile App**: Giao diện người dùng trên nền tảng di động, đảm bảo trải nghiệm thân thiện và trực quan.
- **Backend Microservices**: Hệ thống backend được phân chia thành các dịch vụ độc lập (Auth Service, Transaction Service, AI Service, Insight Service), giao tiếp thông qua API Gateway và Message Queue.
- **AI Integration**: Tích hợp dịch vụ OCR (Google Vision API) để xử lý ảnh và AI insight (OpenAI API) để phân tích tài chính, thông qua các API bên thứ ba.
- **Database phân tán**: Mỗi microservice quản lý cơ sở dữ liệu riêng biệt theo mô hình *Database per Service*, đảm bảo tính độc lập và tránh coupling giữa các dịch vụ.

### 1.3.2. Ngoài phạm vi đề tài (Out of Scope)

Để tập trung vào trọng tâm nghiên cứu, đề tài **không** thực hiện các hạng mục sau:

- **Không xây dựng mô hình AI từ đầu**: Hệ thống chỉ sử dụng và tích hợp các API AI có sẵn (Google Vision, OpenAI) thay vì tự huấn luyện mô hình học máy.
- **Không xây dựng hệ thống ngân hàng thực tế**: Đề tài không tích hợp cổng thanh toán trực tiếp hay kết nối với tài khoản ngân hàng thật của người dùng.

---

## 1.4. Đối tượng sử dụng

Hệ thống S.Budget được thiết kế hướng đến các nhóm người dùng chính sau:

| Đối tượng | Đặc điểm & Nhu cầu |
|-----------|---------------------|
| **Người đi làm** | Thu nhập ổn định, cần theo dõi chi tiêu hàng tháng, lập kế hoạch tiết kiệm và kiểm soát ngân sách sinh hoạt |
| **Sinh viên** | Ngân sách hạn chế, cần kiểm soát chặt các khoản chi tiêu hàng ngày để tránh thâm hụt cuối tháng |
| **Người muốn quản lý tài chính cá nhân** | Có mong muốn xây dựng thói quen tài chính lành mạnh, cần công cụ trực quan để hiểu rõ thói quen chi tiêu và đưa ra quyết định tài chính tốt hơn |

---

## 1.5. Tổng quan chức năng hệ thống

Hệ thống S.Budget được tổ chức thành 5 nhóm chức năng chính, phản ánh toàn bộ luồng nghiệp vụ từ thu thập dữ liệu đến phân tích và bảo mật:

### Nhóm 1: Ghi nhận giao dịch
Cho phép người dùng ghi lại giao dịch tài chính nhanh chóng thông qua:
- Nhập văn bản tự nhiên (ví dụ: *"80k cafe"*, *"150k xăng"*)
- Chụp ảnh hoặc tải lên screenshot hóa đơn, biên lai

### Nhóm 2: AI xử lý tự động
Hệ thống tự động phân tích đầu vào của người dùng:
- OCR trích xuất text từ ảnh hóa đơn
- NLP nhận diện số tiền và danh mục chi tiêu
- Tự động điền thông tin giao dịch mà không cần người dùng nhập thủ công

### Nhóm 3: Quản lý giao dịch
Cung cấp các thao tác CRUD đầy đủ cho dữ liệu giao dịch:
- Xem danh sách, lọc, tìm kiếm giao dịch
- Chỉnh sửa và xóa giao dịch
- Phân loại theo danh mục và khoảng thời gian

### Nhóm 4: Phân tích & Insight
Biến dữ liệu giao dịch thành thông tin hữu ích:
- Thống kê chi tiêu theo ngày/tuần/tháng
- Biểu đồ trực quan theo danh mục
- Gợi ý và insight tài chính cá nhân hóa dựa trên AI

### Nhóm 5: Xác thực & Bảo mật
Đảm bảo an toàn thông tin người dùng:
- Đăng ký, đăng nhập tài khoản
- Xác thực danh tính bằng JWT (JSON Web Token)
- Mã hóa dữ liệu nhạy cảm trong quá trình lưu trữ và truyền tải

---

### Sơ đồ tổng quan chức năng

```
S.Budget
├── 1. Ghi nhận giao dịch
│   ├── Nhập text tự nhiên ("80k cafe")
│   └── Chụp ảnh / tải screenshot hóa đơn
│
├── 2. AI xử lý tự động
│   ├── OCR nhận diện nội dung ảnh
│   ├── Trích xuất số tiền
│   └── Phân loại danh mục tự động
│
├── 3. Quản lý giao dịch
│   ├── Xem danh sách giao dịch
│   ├── Chỉnh sửa / xóa giao dịch
│   └── Lọc & tìm kiếm
│
├── 4. Phân tích & Insight
│   ├── Thống kê theo ngày / tuần / tháng
│   ├── Biểu đồ chi tiêu theo danh mục
│   └── Gợi ý & insight tài chính cá nhân
│
└── 5. Xác thực & Bảo mật
    ├── Đăng ký / Đăng nhập
    ├── Xác thực JWT
    └── Mã hóa dữ liệu nhạy cảm
```

---

*Chương tiếp theo sẽ trình bày cơ sở lý thuyết và các công nghệ được ứng dụng trong hệ thống S.Budget.*
