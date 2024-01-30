import { Test, TestingModule } from '@nestjs/testing';
import { PromotionHistoryResolver } from './promotion_history.resolver';
import { PromotionHistoryService } from './promotion_history.service';

describe('PromotionHistoryResolver', () => {
  let resolver: PromotionHistoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionHistoryResolver, PromotionHistoryService],
    }).compile();

    resolver = module.get<PromotionHistoryResolver>(PromotionHistoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
