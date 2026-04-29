import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ApiGatewayModule } from './api-gateway.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // ─── Global Exception Filter (phải đăng ký trước pipes) ─────────────────────
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ─── Global Validation Pipe ──────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ─── CORS ────────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: '*', // TODO: restrict in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ─── Global Prefix ───────────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  const port = process.env['API_GATEWAY_PORT'] || 3000;
  await app.listen(port);
  console.log(`🚀 API Gateway is running on port ${port}`);
}
bootstrap();
