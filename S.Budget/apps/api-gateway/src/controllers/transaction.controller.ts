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
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TRANSACTION_SERVICE, AI_SERVICE, MESSAGE_PATTERNS } from '@app/shared/constants/index';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
  QuickAddDto,
} from '@app/shared/dto/index';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Public } from '../decorators/public.decorator';
import { IJwtPayload } from '@app/shared/interfaces';
import { CloudinaryService } from '../services/cloudinary.service';

@Controller('transactions')
export class TransactionGatewayController {
  constructor(
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionClient: ClientProxy,
    @Inject(AI_SERVICE)
    private readonly aiClient: ClientProxy,
    private readonly cloudinaryService: CloudinaryService,
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
    @Body('text') text: string,
    @CurrentUser() user: IJwtPayload,
  ) {
    if (!text) {
      throw new BadRequestException('Text is required');
    }

    // 1. Gọi AI Service để phân tích text
    const parsedData = await firstValueFrom(
      this.aiClient.send(MESSAGE_PATTERNS.AI_PARSE_TEXT, { text }),
    );

    // 2. Tạo QuickAddDto
    const dto: QuickAddDto = {
      text,
      amount: parsedData.amount,
      type: parsedData.type || 'expense',
      categoryName: parsedData.categoryName || 'Khác',
      note: parsedData.note || '',
    };

    // 3. Gửi sang Transaction Service
    return firstValueFrom(
      this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_QUICK_ADD, {
        userId: user.sub,
        dto,
      }),
    );
  }

  /**
   * Upload hình ảnh hóa đơn/screenshot -> AI đọc OCR -> Lưu giao dịch
   */
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: IJwtPayload,
  ) {
    if (!file) throw new BadRequestException('No file provided');

    // 1. Upload ảnh lên Cloudinary lấy URL
    const uploadResult = await this.cloudinaryService.uploadImage(file);
    const imageUrl = uploadResult.secure_url;

    // 2. Gửi URL sang AI Service để chạy OCR (đọc hóa đơn, bóc tách thông tin)
    const parsedData = await firstValueFrom(
      this.aiClient.send(MESSAGE_PATTERNS.AI_OCR_PROCESS, { imageUrl }),
    );

    // 3. Tạo DTO để lưu giao dịch
    const dto: QuickAddDto = {
      text: 'Parsed from image',
      amount: parsedData.amount || 0,
      type: parsedData.type || 'expense',
      categoryName: parsedData.categoryName || 'Khác',
      note: parsedData.note || 'Từ hóa đơn ảnh',
    };

    // 4. Gửi sang Transaction Service lưu lại, gửi kèm imageUrl
    const finalDto = { ...dto, imageUrl };

    return firstValueFrom(
      this.transactionClient.send(MESSAGE_PATTERNS.TRANSACTION_QUICK_ADD, {
        userId: user.sub,
        dto: finalDto,
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
