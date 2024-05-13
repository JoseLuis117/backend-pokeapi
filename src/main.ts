import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8000);
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
}
bootstrap();
