import { Module } from '@nestjs/common';
import { InsightServiceController } from './insight-service.controller';
import { InsightServiceService } from './insight-service.service';

@Module({
  imports: [],
  controllers: [InsightServiceController],
  providers: [InsightServiceService],
})
export class InsightServiceModule {}
