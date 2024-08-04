import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { SentryModule } from '@sentry/nestjs/setup';
// import { TypeOrmModule } from '@nestjs/typeorm';==> FOR DB SHOW OFF
// import { join } from 'path';==> FOR DB SHOW OFF

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';
import { TransformInterceptor } from './encryption/encryption.interceptor';
import { CountriesController } from './countries/countries.controller';
import { DecryptionMiddleware } from './decryption/decryption.middleware';

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    //_____ NOTE: I AM JUST SHOWING OFF DATABASE SETUP BUT NOT IN-USE, BECAUSE I UTILIZED CACHE OPTIMALLY TO STORE ____
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   database: process.env.DB_DATABASE,
    //   url: process.env.DB_CONNECTION_URL,
    //   entities: [join(__dirname, '**/**.entity{.ts,.js}')],
    //   synchronize: process.env.NODE_ENV === 'development' ? true : false,
    //   useNewUrlParser: true,
    //   logging: process.env.NODE_ENV === 'development',
    // }),
    CacheModule.register({
      isGlobal: true,
      ttl: parseInt(process.env.CACHE_EXPIRATION_IN_SECONDS),
      max: parseInt(process.env.CACHE_MAX_LIMIT),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.LIMITER_DURATION),
        limit: parseInt(process.env.LIMITER_MAX_LIMIT),
      },
    ]),
    LoggerModule,
    AuthModule,
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecryptionMiddleware).forRoutes(CountriesController);
  }
}
