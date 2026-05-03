import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import OpenAI from 'openai';

@Injectable()
export class AiServiceService {
  private readonly logger = new Logger(AiServiceService.name);
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.openai = new OpenAI({ apiKey: apiKey || 'dummy-key' }); // dummy-key prevents crash if not configured yet
  }

  async parseTextToTransaction(text: string): Promise<any> {
    try {
      this.logger.log(`Parsing text: ${text}`);

      const prompt = `
Bạn là một trợ lý tài chính cá nhân. Nhiệm vụ của bạn là trích xuất thông tin giao dịch từ câu nói tự nhiên của người dùng và trả về MỘT chuỗi JSON duy nhất, không kèm theo bất kỳ văn bản giải thích hay định dạng markdown nào.

Ví dụ: 
Input: "80k cafe"
Output: {"amount": 80000, "categoryName": "Cafe/Đồ uống", "type": "expense", "note": "cafe"}

Input: "nhận lương 20 củ"
Output: {"amount": 20000000, "categoryName": "Thu nhập", "type": "income", "note": "nhận lương"}

Hãy trích xuất từ câu sau: "${text}"
`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0,
      });

      const resultText = response.choices[0]?.message?.content?.trim();
      
      if (!resultText) {
        throw new Error('Empty response from OpenAI');
      }

      // Xóa các ký tự markdown dư thừa nếu có (vd: ```json ... ```)
      const cleanedText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(cleanedText);

      return parsedData;
    } catch (error) {
      this.logger.error(`Failed to parse text: ${error.message}`, error.stack);
      throw new RpcException({
        statusCode: 500,
        message: 'Could not parse text to transaction via AI',
      });
    }
  }

  async processImageOcr(imageUrl: string): Promise<any> {
    try {
      this.logger.log(`Processing OCR for image: ${imageUrl}`);

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o', // Hoặc model hỗ trợ vision
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Bạn là một trợ lý tài chính thông minh. Hãy đọc ảnh hoá đơn (hoặc ảnh chụp màn hình chuyển khoản) này và trích xuất thông tin giao dịch. 
Hãy trả về MỘT chuỗi JSON duy nhất, không kèm theo văn bản nào khác.
Cấu trúc JSON bắt buộc phải có:
{
  "amount": (số tiền lớn nhất hoặc tổng tiền cần thanh toán, kiểu number),
  "categoryName": (phân loại hợp lý nhất: Ăn uống, Mua sắm, Di chuyển, ...),
  "type": "expense" (hoặc "income" nếu là nhận tiền),
  "note": (tên cửa hàng, nội dung chuyển khoản, v.v.)
}`,
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl },
              },
            ],
          },
        ],
        max_tokens: 300,
        temperature: 0,
      });

      const resultText = response.choices[0]?.message?.content?.trim();
      
      if (!resultText) {
        throw new Error('Empty response from OpenAI Vision');
      }

      const cleanedText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch (error) {
      this.logger.error(`Failed to process image OCR: ${error.message}`, error.stack);
      throw new RpcException({
        statusCode: 500,
        message: 'Could not extract data from image via AI',
      });
    }
  }
}
