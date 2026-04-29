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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TRANSACTION_SERVICE, MESSAGE_PATTERNS } from '@app/shared/constants/index';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
  QuickAddDto,
} from '@app/shared/dto/index';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Public } from '../decorators/public.decorator';
import { IJwtPayload } from '@app/shared/interfaces';

@Controller('transactions')
export class TransactionGatewayController {
  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionClient: ClientProxy,
  ) {}

  /** Tạo giao dịch mới */
  @Post()
  async create(
    @Body() dto: CreateTransactionDto,
    @CurrentUser() user: IJwtPayload,
  ) {
    return firstValueFrom(
      this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_CREATE, {
        userId: user.sub,
        dto,
      }),
    );
  }

  /** Nhập nhanh từ text tự nhiên */
  @Post('quick-add')
  async quickAdd(
    @Body() dto: QuickAddDto,
    @CurrentUser() user: IJwtPayload,
  ) {
    return firstValueFrom(
      this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_QUICK_ADD, {
        userId: user.sub,
        dto,
      }),
    );
  }

  /** Lấy danh sách giao dịch (phân trang + lọc) */
  @Get()
  async findAll(
    @CurrentUser() user: IJwtPayload,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('type') type?: 'expense' | 'income',
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return firstValueFrom(
      this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_FIND_ALL, {
        userId: user.sub,
        query: {
          page: Number(page),
          limit: Number(limit),
          type,
          startDate,
          endDate,
          categoryId,
        },
      }),
    );
  }

  /** Lấy chi tiết một giao dịch */
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: IJwtPayload,
  ) {
    return firstValueFrom(
      this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_FIND_ONE, {
        userId: user.sub,
        id,
      }),
    );
  }

  /** Cập nhật giao dịch */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTransactionDto,
    @CurrentUser() user: IJwtPayload,
  ) {
    return firstValueFrom(
      this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_UPDATE, {
        userId: user.sub,
        id,
        dto,
      }),
    );
  }

  /** Xoá giao dịch (soft-delete) */
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: IJwtPayload,
  ) {
    return firstValueFrom(
      this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_DELETE, {
        userId: user.sub,
        id,
      }),
    );
  }

  /**
   * Lấy danh sách danh mục chi tiêu.
   * @Public() — client cần danh mục để hiển thị dropdown, không cần đăng nhập.
   */
  @Public()
  @Get('categories')
  async getCategories() {
    return firstValueFrom(
      this.transactionClient.send(MESSAGE_PATTERNS.CATEGORY_FIND_ALL, {}),
    );
  }
}
