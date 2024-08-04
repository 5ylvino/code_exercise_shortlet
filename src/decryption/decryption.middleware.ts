import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { decrypt } from 'src/utils/encryption-decryption';

@Injectable()
export class DecryptionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (process.env.NODE_ENV === 'production') {
      try {
        //when coming in encrypted from a client app on PROD
        const encryptedBody = req.body.encrypted;
        if (!encryptedBody) {
          throw new BadRequestException('Your request is not recognized');
        }

        const decryptedBody = decrypt(encryptedBody);

        if (!decryptedBody) {
          throw new BadRequestException('Your request is not recognized');
        }

        req.body = decryptedBody;

        next();
      } catch (error) {
        throw new BadRequestException('Your request is not recognized');
      }
    } else {
      next();
    }
  }
}
