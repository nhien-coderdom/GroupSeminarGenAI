import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TRANSACTION_SERVICE } from '@app/shared/constants/index';
import { MESSAGE_PATTERNS } from '@app/shared/constants/index';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
  QuickAddDto,
} from '@app/shared/dto/index';

@Controller('transactions')
export class TransactionGatewayController {
  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createDto: CreateTransactionDto) {
    try {
      return await firstValueFrom(
        this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_CREATE, {
          ...createDto,
          userId: 'TODO_FROM_JWT', // Will be replaced with JWT guard
        }),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Failed to create transaction',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('quick-add')
  async quickAdd(@Body() quickAddDto: QuickAddDto) {
    try {
      return await firstValueFrom(
        this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_QUICK_ADD, {
          ...quickAddDto,
          userId: 'TODO_FROM_JWT',
        }),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Quick add failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    try {
      return await firstValueFrom(
        this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_FIND_ALL, {
          userId: 'TODO_FROM_JWT',
          page: Number(page),
          limit: Number(limit),
          startDate,
          endDate,
          categoryId,
        }),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Failed to fetch transactions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await firstValueFrom(
        this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_FIND_ONE, {
          id,
          userId: 'TODO_FROM_JWT',
        }),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Transaction not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateTransactionDto,
  ) {
    try {
      return await firstValueFrom(
        this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_UPDATE, {
          id,
          userId: 'TODO_FROM_JWT',
          ...updateDto,
        }),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Failed to update transaction',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await firstValueFrom(
        this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_DELETE, {
          id,
          userId: 'TODO_FROM_JWT',
        }),
      );
    } catch (error) {
      throw new HttpException(
        (error as Error).message || 'Failed to delete transaction',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
