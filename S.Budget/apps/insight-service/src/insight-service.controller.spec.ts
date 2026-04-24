import { Test, TestingModule } from '@nestjs/testing';
import { InsightServiceController } from './insight-service.controller';
import { InsightServiceService } from './insight-service.service';

describe('InsightServiceController', () => {
  let insightServiceController: InsightServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InsightServiceController],
      providers: [InsightServiceService],
    }).compile();

    insightServiceController = app.get<InsightServiceController>(InsightServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(insightServiceController.getHello()).toBe('Hello World!');
    });
  });
});
