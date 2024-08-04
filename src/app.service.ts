import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `${process.env.APP_NAME} ${process.env.NODE_ENV}`;
  }
}
