import {
  Controller,
  Get,
  Query,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { INSIGHT_SERVICE } from '@app/shared/constants/index';
import { MESSAGE_PATTERNS } from '@app/shared/constants/index';

@Controller('insights')
export class InsightGatewayController {
  constructor(
    @Inject(INSIGHT_SERVICE) private readonly insightClient: ClientProxy,
  ) {}

  @Get('stats')
  async getStats(@Query('month') month?: string) {
    try {
      return await firstValueFrom(
        this.insightClient.send(MESSAGE_PATTERNS.INSIGHT_STATS, {
          userId: 'TODO_FROM_JWT',
          month: month || new Date().toISOString().slice(0, 7),
        }),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Failed to fetch stats',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('behavior')
  async getBehavior() {
    try {
      return await firstValueFrom(
        this.insightClient.send(MESSAGE_PATTERNS.INSIGHT_BEHAVIOR, {
          userId: 'TODO_FROM_JWT',
        }),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Failed to fetch behavior insights',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('recommendations')
  async getRecommendations() {
    try {
      return await firstValueFrom(
        this.insightClient.send(MESSAGE_PATTERNS.INSIGHT_RECOMMEND, {
          userId: 'TODO_FROM_JWT',
        }),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Failed to fetch recommendations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
