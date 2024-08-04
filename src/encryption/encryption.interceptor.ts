import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { encrypt } from 'src/utils/encryption-decryption';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(({ data, error }) => {
        if (process.env.NODE_ENV === 'production') {
          return { encrypted: encrypt({ success: !error, data, error }) };
        }

        return { success: !error, data, error };
      }),
    );
  }
}
