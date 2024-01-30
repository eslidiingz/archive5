import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromotionHistoryService } from './promotion_history.service';
import { PromotionHistory } from './entities/promotion_history.entity';
import { CreatePromotionHistoryInput } from './dto/create-promotion_history.input';
import { UpdatePromotionHistoryInput } from './dto/update-promotion_history.input';

@Resolver(() => PromotionHistory)
export class PromotionHistoryResolver {
  constructor(private readonly promotionHistoryService: PromotionHistoryService) {}

  @Mutation(() => PromotionHistory)
  createPromotionHistory(@Args('createPromotionHistoryInput') createPromotionHistoryInput: CreatePromotionHistoryInput) {
    return this.promotionHistoryService.create(createPromotionHistoryInput);
  }

  @Query(() => [PromotionHistory], { name: 'promotionHistory' })
  findAll() {
    return this.promotionHistoryService.findAll();
  }

  @Query(() => PromotionHistory, { name: 'promotionHistoryById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.promotionHistoryService.findOne(id);
  }

  @Mutation(() => PromotionHistory)
  updatePromotionHistory(@Args('updatePromotionHistoryInput') updatePromotionHistoryInput: UpdatePromotionHistoryInput) {
    return this.promotionHistoryService.update(updatePromotionHistoryInput.id, updatePromotionHistoryInput);
  }

  @Mutation(() => PromotionHistory)
  removePromotionHistory(@Args('id', { type: () => Int }) id: number) {
    return this.promotionHistoryService.remove(id);
  }
}
