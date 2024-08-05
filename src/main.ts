import './instrument';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { TransformInterceptor } from './encryption/encryption.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.enableCors();
  app.use(helmet());
  app.useLogger(app.get(LoggerService));
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: process.env.ROUTE_PREFIX,
    defaultVersion: process.env.ROUTE_VERSION,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV !== 'development',
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Countries Documentation')
    .setDescription('The Countries API route description')
    .setVersion('1.0.0')
    .addTag('countries')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(parseInt(process.env.APP_PORT));
}
bootstrap();
