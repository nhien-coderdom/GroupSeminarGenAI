import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TransactionServiceModule } from './transaction-service.module';
import { TRANSACTION_QUEUE } from '@app/shared/constants/index';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TransactionServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env['RABBITMQ_URL'] || 'amqp://localhost:5672'],
        queue: TRANSACTION_QUEUE,
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
  console.log('💰 Transaction Service is listening on RabbitMQ');
}
bootstrap();
