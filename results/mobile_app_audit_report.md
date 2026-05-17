# Mobile App Architecture & UX Audit Report

## 1. Tổng quan các Screens

*   **Tổng số screens hiện có:** 5 screens
*   **Danh sách screens đã implement:**
    *   `LoginScreen.tsx`
    *   `DashboardScreen.tsx`
    *   `TransactionScreen.tsx`
    *   `AIAssistantScreen.tsx`
    *   `ProfileScreen.tsx`
*   **Screens nào còn là dummy/placeholder:**
    *   *Thực tế, tất cả 5 screens hiện tại đều đang ở dạng dummy/placeholder.* Chúng sử dụng hoàn toàn dữ liệu mock từ `src/data/mock.ts` hoặc hardcode tĩnh, chưa có kết nối API thực tế tới backend.

## 2. Reusable Components

*   **Tổng số reusable components:** 4 components
*   **Danh sách components hiện có:**
    *   `Button.tsx`: Nút bấm có hỗ trợ các variants (primary, secondary, outline) và trạng thái loading/disabled.
    *   `Card.tsx`: Container với styling đổ bóng và bo góc (thường dùng làm wrapper).
    *   `Input.tsx`: Component nhập liệu có hỗ trợ hiển thị label và error message.
    *   `TransactionCard.tsx`: Component hiển thị thông tin của một giao dịch cụ thể (icon, title, category, amount) phân biệt màu sắc giữa thu/chi.

## 3. Navigation Structure

Cấu trúc điều hướng hiện tại được xây dựng bằng `@react-navigation`:
*   **RootNavigator** (`RootNavigator.tsx`)
    *   **Auth** (`AuthNavigator.tsx`)
        *   -> `Login` (`LoginScreen.tsx`)
    *   **Main** (`MainTabNavigator.tsx`) - Bottom Tabs
        *   -> `Dashboard` (`DashboardScreen.tsx`)
        *   -> `Transactions` (`TransactionScreen.tsx`)
        *   -> `AI Assistant` (`AIAssistantScreen.tsx`)
        *   -> `Profile` (`ProfileScreen.tsx`)

## 4. Auth Flow hiện tại

*   **Đang hoạt động tới đâu:** Auth flow chỉ mới dừng lại ở mức mô phỏng UI (Mock Flow).
    *   **Đăng nhập:** Màn hình `LoginScreen` cho phép nhập email/password, nhưng khi bấm "Login", nó chỉ hiện trạng thái loading ảo trong 1 giây (`setTimeout`) rồi chuyển thẳng sang màn `Main`. Không có validation thực tế hay gọi API.
    *   **Đăng xuất:** Nút "Log Out" trong `ProfileScreen` cho phép điều hướng ngược lại màn hình `Login`.
    *   **Còn thiếu:** Chưa có luồng Đăng ký (Register), Quên mật khẩu (Forgot Password), hay cơ chế lưu trữ token/session (như AsyncStorage).

## 5. Trạng thái các tính năng chính (Main Tabs)

*   **Dashboard (`DashboardScreen`):**
    *   Hiển thị lời chào với tên user (mock data).
    *   Hiển thị tổng số dư, thu nhập và chi tiêu trong tháng (mock data).
    *   Hiển thị danh sách 3 giao dịch gần nhất (cắt từ mock data).
*   **Transaction (`TransactionScreen`):**
    *   Có hiệu ứng loading giả (500ms).
    *   Hiển thị toàn bộ danh sách giao dịch dưới dạng danh sách trượt (`FlatList`) lấy từ mock data.
*   **AI (`AIAssistantScreen`):**
    *   Gồm 2 phần chính: *Smart Insights* (nhận xét chi tiêu) và *Scan Receipt* (quét hóa đơn).
    *   Cả 2 phần này hoàn toàn là text tĩnh/hardcode. Các nút "View Detailed Report" và "Scan Now" chưa được gắn bất kỳ action hay navigation nào (`onPress={() => {}}`).
*   **Profile (`ProfileScreen`):**
    *   Hiển thị thông tin user (Avatar mặc định, tên, email từ mock data).
    *   Các mục thiết lập: *Account Settings*, *Notifications*, *Security* - đang là các UI Card tĩnh chưa click được.
    *   Nút Log Out hoạt động để chuyển về màn Login.

## 6. Đánh giá tính năng (Features Assessment)

*   **Những features nào đã hoạt động:**
    *   Cơ chế điều hướng cơ bản (Stack & Tab Navigation).
    *   Render UI components cơ bản.
*   **Những features nào mới chỉ là mock UI:**
    *   Toàn bộ luồng xác thực (Authentication).
    *   Lấy và hiển thị dữ liệu người dùng, số dư, giao dịch.
    *   Phân tích AI Insight (chưa gọi tới API AI-Service/Insight-Service).
    *   Chức năng Scan Hóa đơn (chưa tích hợp Camera hay gọi API OCR).

## 7. Những flow còn thiếu (so với tiêu chuẩn / Design Docs)

*Dựa trên việc suy luận logic của một ứng dụng quản lý chi tiêu (theo UX flow chuẩn):*
*   **Flow Thêm Giao Dịch Mới (Add Transaction):** Thiếu màn hình/modal để người dùng nhập tay một giao dịch mới (chọn loại, nhập số tiền, chọn danh mục, ghi chú).
*   **Flow Quét Hóa Đơn (OCR/Camera Flow):** Chưa có màn hình sử dụng Camera hoặc Image Picker để chọn ảnh hóa đơn và gửi đi phân tích.
*   **Flow Đăng Ký (Sign Up):** Thiếu màn hình tạo tài khoản cho người dùng mới.
*   **Flow Quản Lý Cấu Hình (Settings & Profile Edit):** Các mục Account, Security chưa có màn hình chi tiết để thay đổi thông tin hay mật khẩu.
*   **Flow Thống Kê Chi Tiết (Analytics/Charts):** Chưa có biểu đồ trực quan (Pie chart, Bar chart) thống kê chi tiêu theo tháng/danh mục mà thường thấy trong các file design PDF của S.Budget.
