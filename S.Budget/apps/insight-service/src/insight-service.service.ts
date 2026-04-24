import { Injectable } from '@nestjs/common';

@Injectable()
export class InsightServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
