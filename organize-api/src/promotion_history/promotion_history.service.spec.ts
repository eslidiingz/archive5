import { Test, TestingModule } from '@nestjs/testing';
import { PromotionHistoryService } from './promotion_history.service';

describe('PromotionHistoryService', () => {
  let service: PromotionHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionHistoryService],
    }).compile();

    service = module.get<PromotionHistoryService>(PromotionHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
