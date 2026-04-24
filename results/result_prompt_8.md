# Result Prompt 8: Khắc phục lỗi TS5098 (Cấu hình TypeScript)

## Lỗi phát hiện thực tế
- **Thông báo:** `error TS5098: Option 'resolvePackageJsonExports' can only be used when 'moduleResolution' is set to 'node16', 'nodenext', or 'bundler'`.
- **Nguyên nhân:** Khi chuyển `moduleResolution` sang `node` để sửa lỗi import trước đó, thuộc tính `resolvePackageJsonExports` (vốn chỉ dành cho các chuẩn resolution mới) đã không còn hợp lệ và gây lỗi build ngay lập tức.

## Hành động đã thực hiện
- **Sửa cấu hình TypeScript:** Đã xoá dòng `"resolvePackageJsonExports": true` trong file `tsconfig.json` gốc.
- **Xử lý Timeout:** Lỗi build này xảy ra rất nhanh, việc bạn thấy "timeout" có thể do hệ thống Docker cố gắng restart service khi build thất bại liên tục hoặc do tài nguyên máy tính bị chiếm dụng trong quá trình build song song nhiều service.

## Kết quả mong đợi
- Trình biên dịch TypeScript sẽ không còn báo lỗi cấu hình và quá trình build NestJS sẽ được tiếp tục.
