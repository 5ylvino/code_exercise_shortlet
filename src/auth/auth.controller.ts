import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Generate authorization token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully generated authorization token',
    schema: {
      example: {
        accessToken: 'your-access-token',
      },
    },
  })
  generateAuthorizationToken() {
    return this.authService.generateAuthorizationToken();
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh authorization token' })
  @ApiBody({
    description: 'Refresh token',
    required: true,
    schema: {
      type: 'object',
      properties: {
        refresh_token: {
          type: 'string',
          description: 'The refresh token to obtain a new access token',
          example: 'your-refresh-token',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully refreshed authorization token',
    schema: {
      example: {
        accessToken: 'your-new-access-token',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid refresh token',
  })
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshAuthorizationToken(refreshToken);
  }
}
