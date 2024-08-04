import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('generateAuthorizationToken', () => {
    it('should return access_token and refresh_token if user is authorized', async () => {
      const signSpy = jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const result = await service.generateAuthorizationToken();

      expect(result).toEqual({
        data: {
          access_token: 'token',
          refresh_token: 'token',
        },
        error: null,
      });
      expect(signSpy).toHaveBeenCalledTimes(2);
    });

    it('should return error if user is not authorized', async () => {
      const originalUser = 'wrong_user@123456789';
      jest
        .spyOn(service, 'generateAuthorizationToken')
        .mockImplementation(async () => {
          const identity = '123456789';
          const user = originalUser?.split('@');
          const user_identity = user[1];
          const userName = user[0];

          if (user_identity === identity) {
            const payload = { username: userName, sub: Math.random() };

            const access_token = jwtService.sign(payload),
              refresh_token = jwtService.sign(payload, { expiresIn: '7d' });

            return { data: { access_token, refresh_token }, error: null };
          }
          return { data: null, error: 'Unauthorize access' };
        });

      const result = await service.generateAuthorizationToken();

      expect(result).toEqual({
        data: null,
        error: 'Unauthorize access',
      });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Test Error';
      jest.spyOn(jwtService, 'sign').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const result = await service.generateAuthorizationToken();

      expect(result).toEqual({
        data: null,
        error: errorMessage,
      });
    });
  });

  describe('refreshAuthorizationToken', () => {
    it('should return new access_token if refreshToken is valid', async () => {
      const payload = { username: 'tester_me', sub: Math.random() };
      jest.spyOn(jwtService, 'verify').mockReturnValue(payload);
      jest.spyOn(jwtService, 'sign').mockReturnValue('new_access_token');

      const result = await service.refreshAuthorizationToken(
        'valid_refresh_token',
      );

      expect(result).toEqual({
        access_token: 'new_access_token',
      });
    });

    it('should throw UnauthorizedException if refreshToken is invalid', async () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(
        service.refreshAuthorizationToken('invalid_refresh_token'),
      ).rejects.toThrow(
        new UnauthorizedException(
          'Your Invalid refresh token. Please try again',
        ),
      );
    });
  });
});
