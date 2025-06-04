import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './excpetion-filters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
      credentials: true,
    },
  });

  const config = new DocumentBuilder()
    .setTitle('GP RMS')
    .setDescription('Backend Rest API developed for GP RMS')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
      exceptionFactory(errors) {
        const firstErr = errors[0];
        const errorMessage = `${firstErr.constraints ? Object.values(firstErr.constraints).join(', ') : 'Unknown error'}`;
        return new BadRequestException(errorMessage);
      },
    }),
  );

  const adapter = app.getHttpAdapter();
  app.useGlobalFilters(new PrismaClientExceptionFilter(adapter));

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
