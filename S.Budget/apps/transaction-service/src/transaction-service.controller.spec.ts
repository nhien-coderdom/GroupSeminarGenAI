import { Test, TestingModule } from '@nestjs/testing';
import { TransactionServiceController } from './transaction-service.controller';
import { TransactionServiceService } from './transaction-service.service';

describe('TransactionServiceController', () => {
  let transactionServiceController: TransactionServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransactionServiceController],
      providers: [
        {
          provide: TransactionServiceService,
          useValue: {
            create: jest.fn(),
            quickAdd: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    transactionServiceController = app.get<TransactionServiceController>(
      TransactionServiceController,
    );
  });

  it('should be defined', () => {
    expect(transactionServiceController).toBeDefined();
  });
});
