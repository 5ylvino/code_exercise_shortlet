import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: AuthService;

  const mockAuthService = {
    generateAuthorizationToken: jest.fn(),
    refreshAuthorizationToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateAuthorizationToken', () => {
    it('should call generateAuthorizationToken method of AuthService', async () => {
      const token = 'some-token';
      mockAuthService.generateAuthorizationToken.mockResolvedValue(token);

      expect(await controller.generateAuthorizationToken()).toBe(token);
      expect(mockAuthService.generateAuthorizationToken).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('should call refreshAuthorizationToken method of AuthService with the provided token', async () => {
      const refreshToken = 'refresh-token';
      const newToken = 'new-token';
      mockAuthService.refreshAuthorizationToken.mockResolvedValue(newToken);

      expect(await controller.refresh(refreshToken)).toBe(newToken);
      expect(mockAuthService.refreshAuthorizationToken).toHaveBeenCalledWith(
        refreshToken,
      );
    });
  });

  describe('getError', () => {
    it('should throw an error', () => {
      expect(() => controller.getError()).toThrowError(
        'My first Sentry error!',
      );
    });
  });
});
