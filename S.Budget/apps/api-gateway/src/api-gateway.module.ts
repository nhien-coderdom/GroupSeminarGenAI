import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AUTH_SERVICE,
  AUTH_QUEUE,
  TRANSACTION_SERVICE,
  TRANSACTION_QUEUE,
  AI_SERVICE,
  AI_QUEUE,
  INSIGHT_SERVICE,
  INSIGHT_QUEUE,
} from '@app/shared/constants/index';
import { AuthGatewayController } from './controllers/auth.controller';
import { TransactionGatewayController } from './controllers/transaction.controller';
import { InsightGatewayController } from './controllers/insight.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env['RABBITMQ_URL'] || 'amqp://localhost:5672'],
          queue: AUTH_QUEUE,
          queueOptions: { durable: true },
        },
      },
      {
        name: TRANSACTION_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env['RABBITMQ_URL'] || 'amqp://localhost:5672'],
          queue: TRANSACTION_QUEUE,
          queueOptions: { durable: true },
        },
      },
      {
        name: AI_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env['RABBITMQ_URL'] || 'amqp://localhost:5672'],
          queue: AI_QUEUE,
          queueOptions: { durable: true },
        },
      },
      {
        name: INSIGHT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env['RABBITMQ_URL'] || 'amqp://localhost:5672'],
          queue: INSIGHT_QUEUE,
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [
    AuthGatewayController,
    TransactionGatewayController,
    InsightGatewayController,
  ],
})
export class ApiGatewayModule {}
