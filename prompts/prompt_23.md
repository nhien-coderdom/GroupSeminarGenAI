# Prompt 23: Hoàn thiện Phase 5 Backend Testing

## Mục tiêu
Fix các lỗi configuration của bộ test và viết unit tests / integration tests cho các nghiệp vụ cốt lõi của S.Budget Backend theo chuẩn của Skill 05 (Test Case Generator).

## Tasks
1. **Fix Jest config**: Cập nhật `moduleNameMapper` trong `package.json` để nhận diện các module thuộc `@app/shared`.
2. **Fix Prisma Generate script**: Đảm bảo Prisma client được gen chính xác khi chạy test (đã gen thủ công trước đó, cần đảm bảo test pass).
3. **Auth Service Tests**: Viết Unit Test cho AuthService.
4. **Transaction Service Tests**: Viết Unit Test cho việc xử lý Quick Add và CRUD Transaction.
5. **AI Service Tests**: Viết Unit Test cho các tính năng phân loại category và nhận diện OCR.
6. **Insight Service Tests**: Viết Unit Test cho thống kê.

## Ngữ cảnh
Dự án S.Budget, framework NestJS. Đã có Prisma schema, cần mock các hàm tương tác với DB và external APIs.
