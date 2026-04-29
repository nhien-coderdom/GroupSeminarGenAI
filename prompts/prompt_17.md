(nho luu lai prompt va result vao folder tuong ung )
Hoàn thiện Phase 1:
1. RpcException trong Auth Service và Transaction Service: throw RpcException thay vì HttpException để lỗi truyền đúng qua RabbitMQ về Gateway.
2. Seed default categories khi Transaction Service khởi động.
3. Category API: GET /categories tại API Gateway.
