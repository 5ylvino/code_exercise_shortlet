import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateAuthorizationToken() {
    try {
      const identity = `${process.env.AUTH_IDENTITY}`;
      const user = `${process.env.AUTH_USER_IDENTITY}`?.split('@');
      const user_identity = user[1];
      const userName = user[0];

      if (user_identity === identity) {
        const payload = { username: userName, sub: Math.random() };

        const access_token = this.jwtService.sign(payload),
          refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

        return { data: { access_token, refresh_token }, error: null };
      }
      return { data: null, error: 'Unauthorize access' };
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }

  async refreshAuthorizationToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const access_token = this.jwtService.sign(
        { username: payload.username, sub: payload.sub },
        { expiresIn: '10d' },
      );

      return {
        data: { access_token },
        error: null,
      };
    } catch (error) {
      return { data: null, error: error?.message };
    }
  }
}
