# Prompt 27: Implement Complete Auth Flow for Mobile App

## Objective
Xây dựng luồng Authentication hoàn chỉnh cho ứng dụng mobile (S.Budget) theo tiêu chuẩn production-ready, kết nối với backend `auth-service`.

## Scope of Work
1. **Splash Screen:** Màn hình khởi động, kiểm tra token (từ `expo-secure-store`), điều hướng dựa trên trạng thái đăng nhập.
2. **Login Screen:** Xây dựng UI chuẩn form đăng nhập, validation, tích hợp API, xử lý lỗi và điều hướng.
3. **Register Screen:** Xây dựng UI form đăng ký, checkbox terms, password confirmation, validation và tích hợp API.
4. **Auth State Management:** Sử dụng Zustand để quản lý thông tin User và trạng thái xác thực.
5. **API Services Layer:** Xây dựng fetch client hoặc axios instance để gọi API tới `auth-service`.
6. **Navigation Flow:** Cập nhật luồng RootNavigator (Splash -> Auth -> Main).

## Technical Requirements
- UI Framework: React Native, Nativewind
- Form & Validation: `react-hook-form`, `zod`, `@hookform/resolvers`
- State Management: `zustand`
- Token Storage: `expo-secure-store`
- API Integration: Native `fetch` (with interceptors/wrappers) hoặc `axios`. Tạm thời dùng `fetch`.

## Acceptance Criteria
- Ứng dụng khi mở lên phải show Splash screen.
- Nếu token hợp lệ, tự động vào `MainTabNavigator`.
- Nếu không, vào `LoginScreen`.
- Đăng nhập/Đăng ký thành công phải lưu trữ token an toàn và điều hướng phù hợp.
- Tất cả các form phải có validation, hiển thị lỗi rõ ràng.
- Xử lý các edge cases: mạng lỗi, sai mật khẩu, tài khoản tồn tại...
