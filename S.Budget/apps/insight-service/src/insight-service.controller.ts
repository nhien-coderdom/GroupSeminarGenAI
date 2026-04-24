import { Controller, Get } from '@nestjs/common';
import { InsightServiceService } from './insight-service.service';

@Controller()
export class InsightServiceController {
  constructor(private readonly insightServiceService: InsightServiceService) {}

  @Get()
  getHello(): string {
    return this.insightServiceService.getHello();
  }
}
