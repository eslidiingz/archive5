import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { PromotionService } from "./promotion.service";
import { Promotion } from "./entities/promotion.entity";
import { CreatePromotionInput } from "./dto/create-promotion.input";
import { UpdatePromotionInput } from "./dto/update-promotion.input";

@Resolver(() => Promotion)
export class PromotionResolver {
  constructor(private readonly promotionService: PromotionService) {}

  @Mutation(() => Promotion)
  createPromotion(
    @Args("createPromotionInput") createPromotionInput: CreatePromotionInput
  ) {
    return this.promotionService.create(createPromotionInput);
  }

  @Query(() => [Promotion], { name: "promotions" })
  findAll() {
    return this.promotionService.findAll();
  }

  @Query(() => [Promotion], { name: "findPromotionByEventUid" })
  findPromotionByEventUid(@Args("event_uid", { type: () => String }) event_uid: string) {
    return this.promotionService.findPromotionByEventUid(event_uid);
  }

  @Query(() => Promotion, { name: "promotionById" })
  findPromotionById(@Args("id", { type: () => Int }) id: number) {
    return this.promotionService.findOne(id);
  }

  @Mutation(() => Promotion)
  updatePromotion(
    @Args("updatePromotionInput") updatePromotionInput: UpdatePromotionInput
  ) {
    return this.promotionService.update(
      updatePromotionInput.id,
      updatePromotionInput
    );
  }

  @Mutation(() => Promotion)
  removePromotion(@Args("id", { type: () => Int }) id: number) {
    return this.promotionService.remove(id);
  }
}
