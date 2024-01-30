import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CreateVoteGameChoiceInput } from "./dto/create-votegame_choice.input";
import { VoteGameChoiceService } from "./votegame_choice.service";
import { VoteGameChoice } from "./entities/votegame_choice.entity";
import { UpdateVoteGameChoiceInput } from "./dto/update-votegame_choice.input";

@Resolver(() => VoteGameChoice)
export class VoteGameChoiceResolver {
  constructor(private readonly voteGameService: VoteGameChoiceService) {}

  @Mutation(() => VoteGameChoice)
  createVoteGameChoice(
    @Args("createVoteChoiceGame")
    createVoteGameChoicenput: CreateVoteGameChoiceInput
  ) {
    return this.voteGameService.create(createVoteGameChoicenput);
  }

  @Query(() => [VoteGameChoice], { name: "voteGameChoiceByEventUid" })
  findAll(@Args("event_uid", { type: () => String }) event_uid: string) {
    return this.voteGameService.findAll(event_uid);
  }

  @Query(() => VoteGameChoice, { name: "voteGameChoiceByUid" })
  findOne(@Args("uid", { type: () => String }) uid: string) {
    return this.voteGameService.findOne(uid);
  }

  @Mutation(() => VoteGameChoice)
  updateVoteGameChoice(
    @Args("updateVoteGameChoiceInput")
    updateVoteGameInput: UpdateVoteGameChoiceInput
  ) {
    return this.voteGameService.update(
      updateVoteGameInput.id,
      updateVoteGameInput
    );
  }

  @Mutation(() => VoteGameChoice)
  removeVoteGameChoice(@Args("id", { type: () => Int }) id: number) {
    return this.voteGameService.remove(id);
  }
}
