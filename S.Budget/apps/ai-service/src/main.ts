import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AiServiceModule } from './ai-service.module';
import { AI_QUEUE } from '@app/shared/constants/index';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AiServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env['RABBITMQ_URL'] || 'amqp://localhost:5672'],
        queue: AI_QUEUE,
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
  console.log('🤖 AI Service is listening on RabbitMQ');
}
bootstrap();
