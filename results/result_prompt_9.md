# Phân tích lỗi và Phương án sửa đổi

## 1. Xem lỗi ở Terminal
Lỗi chính xuất hiện ở tất cả các service (api-gateway, auth-service, transaction-service, insight-service) là:
`Error: Cannot find module '/app/dist/apps/service-name/main.js'`

Điều này có nghĩa là Node.js không tìm thấy file thực thi `main.js` tại đường dẫn mà Dockerfile đã chỉ định trong lệnh `CMD`.

## 2. Giải thích nguyên nhân
### Tại sao lại xảy ra lỗi này?
Trong một project NestJS monorepo, mặc định compiler (`tsc`) sẽ cố gắng tối ưu hóa cấu trúc thư mục. 
- Khi bạn bắt đầu sử dụng các thư viện dùng chung (như `libs/shared`), compiler nhận thấy rằng mã nguồn không chỉ nằm trong `apps/service-name/src` mà còn nằm ở `libs/shared`.
- Do đó, nó thay đổi `rootDir` từ `apps/service-name/src` thành gốc của toàn bộ project để có thể bao hàm cả `libs`.
- Kết quả là cấu trúc file trong thư mục `dist` bị thay đổi từ:
  `dist/apps/service-name/main.js` 
  thành:
  `dist/apps/service-name/apps/service-name/src/main.js` (rất lồng nhau).

Vì Dockerfile của bạn đang tìm ở `dist/apps/service-name/main.js`, nó sẽ báo lỗi `MODULE_NOT_FOUND`.

### Vấn đề gì từ code trước đó?
Vấn đề nảy sinh từ việc **sử dụng `libs/shared`** mà không cấu hình lại cách build. Khi bạn import `@app/shared` vào các service, NestJS compiler chuyển sang chế độ build phức tạp hơn của monorepo.

Ngoài ra, còn một vấn đề tiềm ẩn với **Prisma**:
Trong Dockerfile, lệnh `npx prisma generate` được chạy ở stage `builder`, nhưng kết quả (nằm trong `node_modules`) không được copy sang stage `production`, hoặc bị xóa mất khi chạy `npm ci --omit=dev`. Điều này sẽ khiến service bị lỗi crash ngay khi vừa start xong (nếu tìm thấy main.js).

## 3. Phương án sửa lỗi

### Bước 1: Cấu hình Webpack trong `nest-cli.json`
Sử dụng Webpack sẽ giúp đóng gói toàn bộ code (bao gồm cả các libs) vào một file `main.js` duy nhất tại đúng vị trí mong muốn, giúp cấu hình Docker ổn định hơn.

### Bước 2: Cập nhật Dockerfile cho các service sử dụng Prisma
Đảm bảo Prisma Client được tạo ra và tồn tại trong stage `production`.

### Bước 3: Sửa lại đường dẫn output trong `schema.prisma`
Đảm bảo Prisma Client được lưu vào thư mục `node_modules` gốc của project để dễ quản lý.

---
(Chi tiết các thay đổi code sẽ được trình bày trong Implementation Plan)
