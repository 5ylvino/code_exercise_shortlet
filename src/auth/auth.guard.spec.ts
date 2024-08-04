import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard, IS_PUBLIC_KEY } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let jwtService: JwtService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let reflector: Reflector;

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        { provide: JwtService, useValue: mockJwtService },
        { provide: Reflector, useValue: mockReflector },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
    reflector = module.get<Reflector>(Reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('canActivate', () => {
    // it('should return true if the route is public', async () => {
    //   const context = createMockExecutionContext(true, 'false');

    //   mockReflector.getAllAndOverride.mockReturnValue(true);

    //   expect(await guard.canActivate(context)).toBe(true);
    //   expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(
    //     IS_PUBLIC_KEY,
    //     [context.getHandler(), context.getClass()],
    //   );
    // });

    it('should throw UnauthorizedException if no token is provided', async () => {
      const context = createMockExecutionContext(false, undefined);

      mockReflector.getAllAndOverride.mockReturnValue(false);

      await expect(guard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      const context = createMockExecutionContext(false, 'invalid-token');

      mockReflector.getAllAndOverride.mockReturnValue(false);
      mockJwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));

      await expect(guard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    // it('should attach user to request if token is valid', async () => {
    //   const context = createMockExecutionContext(false, 'valid-token');
    //   const payload = { userId: '123' };

    //   mockReflector.getAllAndOverride.mockReturnValue(false);
    //   mockJwtService.verifyAsync.mockResolvedValue(payload);

    //   expect(await guard.canActivate(context)).toBe(true);
    //   expect(context.switchToHttp().getRequest()['user']).toEqual(payload);
    // });
  });

  function createMockExecutionContext(
    isPublic: boolean,
    token?: string,
  ): ExecutionContext {
    return {
      getHandler: () => (isPublic ? () => {} : jest.fn()),
      getClass: () => (isPublic ? {} : jest.fn()),
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: token ? `Bearer ${token}` : undefined,
          },
        }),
      }),
    } as unknown as ExecutionContext;
  }
});
