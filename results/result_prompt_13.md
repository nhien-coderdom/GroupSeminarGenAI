# BÁO CÁO DỰ ÁN
## S.BUDGET – Ứng Dụng Quản Lý Ngân Sách Thông Minh

---

# CHƯƠNG 1: TỔNG QUAN ĐỀ TÀI

---

## 1.1 Giới Thiệu Đề Tài

Trong bối cảnh kinh tế ngày càng phát triển và đời sống tài chính cá nhân trở nên phức tạp hơn, việc quản lý chi tiêu một cách hiệu quả đã trở thành nhu cầu thiết yếu đối với mỗi người. Tuy nhiên, phần lớn người dùng – đặc biệt là giới trẻ và sinh viên – vẫn chưa có thói quen hoặc công cụ phù hợp để theo dõi và kiểm soát tài chính cá nhân một cách có hệ thống.

**S.Budget** (Smart Budget) là một ứng dụng quản lý ngân sách thông minh được xây dựng nhằm hỗ trợ người dùng lập kế hoạch tài chính cá nhân, theo dõi thu chi hàng ngày, phân tích xu hướng chi tiêu và đưa ra các gợi ý tối ưu hóa ngân sách dựa trên dữ liệu thực tế. Ứng dụng tích hợp các công nghệ hiện đại như trí tuệ nhân tạo (AI) và giao diện người dùng thân thiện nhằm mang lại trải nghiệm quản lý tài chính đơn giản, trực quan và hiệu quả.

Đề tài được thực hiện với mong muốn tạo ra một giải pháp phần mềm thiết thực, có khả năng ứng dụng thực tế và đáp ứng nhu cầu ngày càng cao của người dùng trong việc làm chủ tài chính bản thân.

---

## 1.2 Tính Cấp Thiết Của Đề Tài

### Bối cảnh xã hội

Theo thống kê từ các tổ chức tài chính quốc tế, hơn **65%** người trưởng thành tại các nước đang phát triển, trong đó có Việt Nam, không có kế hoạch quản lý chi tiêu rõ ràng. Tình trạng "chi nhiều hơn thu", nợ tiêu dùng và thiếu tiết kiệm đang ngày càng phổ biến, nhất là trong nhóm người trẻ từ 18–35 tuổi.

### Hạn chế của các giải pháp hiện tại

Hiện nay, các phương thức quản lý tài chính phổ biến bao gồm:

| Phương thức | Hạn chế |
|---|---|
| Sổ tay ghi chép thủ công | Mất thời gian, dễ sai sót, khó phân tích |
| Bảng tính Excel | Phức tạp, không thân thiện với người dùng phổ thông |
| Ứng dụng nước ngoài | Giao diện tiếng Anh, không phù hợp thói quen chi tiêu Việt Nam |
| Ứng dụng trong nước hiện có | Thiếu tính năng AI, phân tích hời hợt, UX kém |

### Lý do cần thiết phát triển S.Budget

- **Cá nhân hóa cao**: Người dùng Việt Nam có những đặc thù chi tiêu riêng (ăn uống, học phí, phong tục lễ tết, v.v.) mà các ứng dụng ngoại không đáp ứng được.
- **Tích hợp AI**: Phân tích hành vi chi tiêu và đưa ra cảnh báo, lời khuyên theo thời gian thực.
- **Tiếp cận dễ dàng**: Ứng dụng được thiết kế đơn giản, phù hợp cả với người không có nền tảng tài chính.
- **Bảo mật dữ liệu**: Dữ liệu tài chính cá nhân được bảo mật tuyệt đối, không chia sẻ với bên thứ ba.

Từ những lý do trên, việc phát triển **S.Budget** là **cấp thiết và có giá trị thực tiễn cao** trong giai đoạn hiện nay.

---

## 1.3 Mục Tiêu

### Mục tiêu tổng quát

Xây dựng một ứng dụng quản lý ngân sách thông minh giúp người dùng kiểm soát tài chính cá nhân một cách hiệu quả, khoa học và dễ sử dụng.

### Mục tiêu cụ thể

1. **Quản lý thu chi**: Cho phép người dùng ghi nhận, phân loại và theo dõi các khoản thu nhập và chi tiêu hàng ngày theo thời gian thực.

2. **Lập kế hoạch ngân sách**: Hỗ trợ người dùng đặt giới hạn ngân sách theo từng danh mục (ăn uống, di chuyển, giải trí, tiết kiệm, v.v.) và cảnh báo khi vượt ngưỡng.

3. **Phân tích và báo cáo**: Cung cấp biểu đồ và báo cáo trực quan về xu hướng chi tiêu theo ngày, tuần, tháng và năm.

4. **Tích hợp AI thông minh**: Phân tích hành vi tài chính và đưa ra gợi ý cá nhân hóa giúp người dùng tối ưu hóa chi tiêu và tăng tiết kiệm.

5. **Trải nghiệm người dùng xuất sắc**: Xây dựng giao diện thân thiện, hiện đại, hỗ trợ đa nền tảng (iOS, Android, Web).

6. **Bảo mật và riêng tư**: Đảm bảo dữ liệu tài chính của người dùng được mã hóa và bảo vệ an toàn.

---

## 1.4 Phạm Vi

### Phạm vi chức năng

Trong khuôn khổ đề tài này, **S.Budget** tập trung vào các chức năng cốt lõi sau:

| STT | Chức năng | Mô tả |
|---|---|---|
| 1 | Quản lý tài khoản người dùng | Đăng ký, đăng nhập, cập nhật thông tin cá nhân |
| 2 | Ghi nhận thu chi | Thêm, sửa, xóa giao dịch; phân loại theo danh mục |
| 3 | Lập ngân sách | Thiết lập và theo dõi ngân sách theo danh mục và thời gian |
| 4 | Báo cáo & thống kê | Biểu đồ thu chi, tỷ lệ chi tiêu theo danh mục |
| 5 | Gợi ý AI | Phân tích xu hướng và đưa ra lời khuyên tài chính cơ bản |
| 6 | Thông báo nhắc nhở | Nhắc nhở ghi chép chi tiêu, cảnh báo vượt ngân sách |

### Phạm vi không bao gồm

- Tích hợp trực tiếp với ngân hàng hoặc ví điện tử (sẽ phát triển trong phiên bản tương lai).
- Đầu tư tài chính, giao dịch chứng khoán hoặc tiền điện tử.
- Quản lý tài chính doanh nghiệp hay tổ chức.

### Phạm vi công nghệ

- **Frontend**: React Native (đa nền tảng iOS & Android) / React.js (Web)
- **Backend**: Node.js với Express.js
- **Cơ sở dữ liệu**: MongoDB (lưu trữ dữ liệu giao dịch), Firebase Authentication (xác thực)
- **AI/ML**: Tích hợp mô hình phân tích chi tiêu dựa trên học máy

### Phạm vi người dùng

Đối tượng hướng đến của S.Budget gồm:

- **Sinh viên và người trẻ** (18–30 tuổi) mới bắt đầu quản lý tài chính.
- **Người đi làm** muốn kiểm soát chi tiêu và tăng tiết kiệm hàng tháng.
- **Gia đình trẻ** cần lập kế hoạch tài chính ngắn và trung hạn.

---

## 1.5 Cấu Trúc Của Báo Cáo

Báo cáo được tổ chức thành **5 chương** với nội dung như sau:

---

**Chương 1 – Tổng Quan Đề Tài**  
Trình bày giới thiệu chung về dự án S.Budget, lý do và sự cần thiết phải xây dựng ứng dụng, các mục tiêu hướng đến, phạm vi thực hiện và bố cục toàn bộ báo cáo.

---

**Chương 2 – Cơ Sở Lý Thuyết**  
Trình bày các khái niệm nền tảng về quản lý tài chính cá nhân, tổng quan về các công nghệ được sử dụng trong dự án (React Native, Node.js, MongoDB, AI/ML), đồng thời phân tích và so sánh các giải pháp tương tự hiện có trên thị trường.

---

**Chương 3 – Phân Tích và Thiết Kế Hệ Thống**  
Đặc tả yêu cầu chức năng và phi chức năng, thiết kế kiến trúc hệ thống, mô hình cơ sở dữ liệu, thiết kế giao diện người dùng (UI/UX) và các luồng xử lý nghiệp vụ chính của ứng dụng.

---

**Chương 4 – Triển Khai và Cài Đặt**  
Mô tả chi tiết quá trình lập trình và hiện thực hóa các chức năng đã thiết kế, bao gồm triển khai backend, frontend, tích hợp AI và quy trình kiểm thử (testing) hệ thống.

---

**Chương 5 – Kết Luận và Hướng Phát Triển**  
Tổng kết kết quả đã đạt được so với mục tiêu đề ra, đánh giá ưu điểm và hạn chế của sản phẩm, đồng thời đề xuất định hướng phát triển trong tương lai như tích hợp ngân hàng số, mở rộng tính năng AI và nâng cấp trải nghiệm người dùng.

---

> **Ghi chú:** Ngoài 5 chương chính, báo cáo còn bao gồm **Tài Liệu Tham Khảo** và các **Phụ Lục** (bản vẽ thiết kế, mã nguồn minh họa, kết quả kiểm thử).
