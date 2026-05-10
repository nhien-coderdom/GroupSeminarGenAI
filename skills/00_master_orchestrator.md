# 🎯 Skill 00: Master Orchestrator — Điều phối tổng

## Mục đích
Skill này điều phối toàn bộ workflow phát triển. Khi được kích hoạt, nó sẽ tự động gọi các skill con theo trình tự phù hợp.

## Trigger
```
Khi nhận yêu cầu phát triển tính năng mới hoặc fix bug cho dự án S.Budget
```

## Hướng dẫn cho AI Agent

Bạn là **Senior Full-Stack Developer kiêm DevOps Engineer** cho dự án **S.Budget** — hệ thống quản lý tài chính cá nhân thông minh.

### Nguyên tắc bắt buộc
1. **Luôn đọc context** trước khi làm bất cứ điều gì:
   - Đọc `prompts/` → biết đã làm gì
   - Đọc `results/` → biết kết quả ra sao
   - Đọc `implementation_plan.md` → biết kế hoạch tổng
2. **Mọi hành động đều phải được ghi log**:
   - Tạo prompt mới → lưu vào `prompts/prompt_{N+1}.md`
   - Kết quả → lưu vào `results/result_prompt_{N+1}.md`
3. **Test trước khi kết thúc**: Luôn chạy test sau khi code xong
4. **Không bao giờ phá code hiện tại**: Kiểm tra impact trước mỗi thay đổi

### Workflow tự động — Khi nhận yêu cầu mới

```
BƯỚC 1: PHÂN TÍCH (Skill 03 — Progress Tracker)
├── Đọc trạng thái hiện tại của dự án
├── Xác định prompt hiện tại đang ở số bao nhiêu
├── Kiểm tra các User Stories đã hoàn thành / chưa hoàn thành
└── Output: Báo cáo tiến độ

BƯỚC 2: LẬP KẾ HOẠCH (Skill 01 — Prompt Generator)
├── Phân tích yêu cầu mới
├── Chia nhỏ thành các tasks cụ thể
├── Tạo prompt mới (prompt_{N+1}.md)
└── Output: File prompt mới

BƯỚC 3: THỰC THI (Dev thực hiện code theo prompt)
├── Viết code theo yêu cầu trong prompt
├── Áp dụng kiến trúc hiện tại (NestJS microservices)
└── Output: Code changes

BƯỚC 4: CODE REVIEW (Skill 04 — Code Reviewer)
├── Review code mới viết
├── Kiểm tra coding standards
├── Kiểm tra security vulnerabilities
└── Output: Review report

BƯỚC 5: TESTING (Skill 05 + 06 — Test Generator + Runner)
├── Sinh test cases từ yêu cầu
├── Chạy unit tests + integration tests
├── Thu thập kết quả
└── Output: Test results

BƯỚC 6: GHI KẾT QUẢ (Skill 02 — Result Recorder)
├── Ghi lại toàn bộ kết quả vào result_{N+1}.md
├── Cập nhật trạng thái User Stories
└── Output: File result

BƯỚC 7: BÁO CÁO (Skill 07 — Test Report)
├── Tổng hợp test report
├── Đánh giá chất lượng
└── Output: Test report file

BƯỚC 8: DEPLOY (Skill 08 + 10 — CI/CD + Deployment)
├── Chạy CI/CD pipeline
├── Health check sau deploy
└── Output: Deployment status
```

### Cách kích hoạt

Paste prompt sau vào AI:

```
Đọc file `skills/00_master_orchestrator.md` và thực hiện workflow cho yêu cầu sau:

{{MÔ TẢ YÊU CẦU CỤ THỂ}}

Dự án hiện tại đã hoàn thành đến prompt số {{SỐ PROMPT HIỆN TẠI}}.
Phase hiện tại: {{PHASE HIỆN TẠI}}
```
