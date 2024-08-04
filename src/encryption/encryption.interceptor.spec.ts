import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { TransformInterceptor } from './encryption.interceptor';
import { encrypt } from '../utils/encryption-decryption';

jest.mock('../utils/encryption-decryption', () => ({
  encrypt: jest.fn(),
}));

describe('TransformInterceptor', () => {
  let interceptor: TransformInterceptor;
  let callHandler: CallHandler;
  let context: ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformInterceptor],
    }).compile();

    interceptor = module.get<TransformInterceptor>(TransformInterceptor);
    callHandler = {
      handle: jest.fn().mockReturnValue(of({ data: 'some data', error: null })),
    };
    context = {} as ExecutionContext;
  });

  it('should return encrypted data in production environment', (done) => {
    process.env.NODE_ENV = 'production';
    (encrypt as jest.Mock).mockReturnValue('encryptedData');

    interceptor.intercept(context, callHandler).subscribe((result) => {
      expect(result).toEqual({ encrypted: 'encryptedData' });
      done();
    });
  });

  it('should return raw data in non-production environment', (done) => {
    process.env.NODE_ENV = 'development';

    interceptor.intercept(context, callHandler).subscribe((result) => {
      expect(result).toEqual({ success: true, data: 'some data', error: null });
      done();
    });
  });

  it('should handle errors correctly', (done) => {
    callHandler.handle = jest
      .fn()
      .mockReturnValue(of({ data: null, error: 'some error' }));
    process.env.NODE_ENV = 'development';

    interceptor.intercept(context, callHandler).subscribe((result) => {
      expect(result).toEqual({
        success: false,
        data: null,
        error: 'some error',
      });
      done();
    });
  });
});
