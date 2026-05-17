# Prompt 26: Implement Real UI & Reusable Components

## Mục tiêu
Dựa trên nền tảng UI/UX đã thiết lập ở Prompt 25, tiến hành xây dựng các thành phần UI thực tế (Real UI) cho ứng dụng S.Budget dựa trên `design/s-budget-ui-v1.pdf`. Đảm bảo sử dụng mock data để hiển thị và kiểm tra luồng trải nghiệm người dùng (UX flow) một cách chân thực nhất.

## Tasks
1. **Xây dựng Reusable Components (`src/components/`):**
   - Các components cơ bản: `Button`, `Input`, `Card`.
   - Các components hiển thị trạng thái: `LoadingSpinner`, `SkeletonLoader`.
   - Các components đặc thù: `TransactionCard`, `Header`.
2. **Cập nhật Layouts & Screens (`src/screens/`):**
   - **LoginScreen:** Thêm form đăng nhập (Email, Password) với validation cơ bản.
   - **DashboardScreen:** Hiển thị tổng số dư (Total Balance), thu/chi (Income/Expense) và danh sách giao dịch gần đây bằng `TransactionCard`.
   - **TransactionScreen:** Hiển thị danh sách toàn bộ giao dịch, cho phép cuộn và hiển thị trạng thái loading.
   - **ProfileScreen:** Thiết kế giao diện thông tin người dùng và các tùy chọn cài đặt.
3. **Tích hợp Mock Data:**
   - Tạo file `src/data/mock.ts` chứa dữ liệu giả lập cho Transactions, User Profile, Insights.
   - Sử dụng mock data trong các màn hình để hiển thị giao diện sát với thực tế nhất.
4. **Kiểm tra UX Flow:**
   - Đảm bảo các tương tác điều hướng, hiển thị danh sách hoạt động mượt mà.

## Ngữ cảnh
Đã hoàn thành Phase thiết lập UI Foundation. Phase hiện tại tập trung vào "Real UI Implementation" để thay thế các Dummy screens, chuẩn bị cho bước tích hợp API thực tế ở các prompt tiếp theo.
