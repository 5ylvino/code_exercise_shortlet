import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtSignature } from './plugins/tokenSignature';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';

const signature = jwtSignature();

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtStrategy,
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: signature,
      signOptions: { expiresIn: '10m' },
    }),
  ],
})
export class AuthModule {}
