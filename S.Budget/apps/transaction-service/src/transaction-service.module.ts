import { Module } from '@nestjs/common';
import { TransactionServiceController } from './transaction-service.controller';
import { TransactionServiceService } from './transaction-service.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [TransactionServiceController],
  providers: [TransactionServiceService, PrismaService],
})
export class TransactionServiceModule {}
