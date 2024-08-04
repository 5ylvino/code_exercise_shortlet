import { DecryptionMiddleware } from './decryption.middleware';
import { BadRequestException } from '@nestjs/common';
import { decrypt } from '../utils/encryption-decryption';

jest.mock('../utils/encryption-decryption');

describe('DecryptionMiddleware', () => {
  let middleware: DecryptionMiddleware;
  let mockReq: any;
  let mockRes: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    middleware = new DecryptionMiddleware();
    mockReq = {
      body: {},
    };
    mockRes = {};
    mockNext = jest.fn();
    process.env.NODE_ENV = 'production'; // Set environment to production
  });

  afterEach(() => {
    jest.resetAllMocks();
    process.env.NODE_ENV = 'test'; // Reset environment after each test
  });

  it('should call next() when not in production', () => {
    process.env.NODE_ENV = 'test';
    middleware.use(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should throw BadRequestException if encrypted body is missing', () => {
    expect(() => middleware.use(mockReq, mockRes, mockNext)).toThrow(
      BadRequestException,
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException if decryption fails', () => {
    mockReq.body.encrypted = 'encryptedData';
    (decrypt as jest.Mock).mockReturnValue(null); // Mock decrypt function to return null

    expect(() => middleware.use(mockReq, mockRes, mockNext)).toThrow(
      BadRequestException,
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should set req.body to decrypted body and call next() on successful decryption', () => {
    const decryptedData = { key: 'value' };
    mockReq.body.encrypted = 'encryptedData';
    (decrypt as jest.Mock).mockReturnValue(decryptedData); // Mock decrypt function to return decrypted data

    middleware.use(mockReq, mockRes, mockNext);

    expect(mockReq.body).toEqual(decryptedData);
    expect(mockNext).toHaveBeenCalled();
  });
});
