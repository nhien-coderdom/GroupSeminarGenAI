import {
  Controller,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from '@app/shared/constants/index';
import { MESSAGE_PATTERNS } from '@app/shared/constants/index';
import { RegisterDto, LoginDto } from '@app/shared/dto/index';

@Controller('auth')
export class AuthGatewayController {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await firstValueFrom(
        this.authClient.send(MESSAGE_PATTERNS.AUTH_REGISTER, registerDto),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Registration failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await firstValueFrom(
        this.authClient.send(MESSAGE_PATTERNS.AUTH_LOGIN, loginDto),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Login failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    try {
      return await firstValueFrom(
        this.authClient.send(MESSAGE_PATTERNS.AUTH_REFRESH, { refreshToken }),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Token refresh failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
