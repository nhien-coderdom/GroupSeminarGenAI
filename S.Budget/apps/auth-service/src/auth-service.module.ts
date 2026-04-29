import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    // JwtModule không dùng secret cố định ở đây vì mỗi sign/verify
    // truyền secret động qua options (hỗ trợ cả access & refresh secret)
    JwtModule.register({}),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService, PrismaService],
})
export class AuthServiceModule {}
