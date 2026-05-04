# Prompt 22

Tiến hành Phase 6: Hoàn tất dự án & Triển khai (Deploy)

Yêu cầu thực hiện:
1. **Docker Compose cho Production**:
   - Tinh chỉnh `docker-compose.yml` hiện tại hoặc tạo thêm `docker-compose.prod.yml`.
   - Đảm bảo các network và restart policy (always) được set đúng.
2. **Script Deploy Tự Động**:
   - Tạo file `deploy.sh` tại thư mục root.
   - Script này sẽ có các bước:
     + Pull code mới nhất từ git (tùy chọn)
     + Build lại các Docker image (`docker-compose build --no-cache` hoặc pull)
     + Restart hệ thống (`docker-compose up -d`)
     + Xóa các image rác (`docker image prune -f`)
3. **Giám sát (Monitoring)**:
   - Tạo script `health-check.sh` để ping tự động vào các cổng của Microservices hoặc dùng Docker healthcheck để đảm bảo 100% services đang chạy xanh mượt.
4. **Viết tổng kết**:
   - Viết `result_prompt_22.md` tổng kết toàn bộ dự án đã thành công.
