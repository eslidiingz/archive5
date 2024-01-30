import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { VoteGameResult } from "./entities/votegame_result.entity";
import { VoteGameResultService } from "./votegame_result.service";
import { CreateVoteGameResultInput } from "./dto/create-votegame_result.input";
import { UpdateVoteGameResultInput } from "./dto/update-votegame_result.input";

@Resolver(() => VoteGameResult)
export class VoteGameResultResolver {
  constructor(private readonly voteGameResultService: VoteGameResultService) {}

  @Mutation(() => VoteGameResult)
  createVoteGameResult(
    @Args("createVoteGameResult")
    createVoteGameResultInput: CreateVoteGameResultInput
  ) {
    return this.voteGameResultService.create(createVoteGameResultInput);
  }

  @Query(() => [VoteGameResult], { name: "voteGameResultByEventUid" })
  findAll(@Args("event_uid", { type: () => String }) event_uid: string) {
    return this.voteGameResultService.findAll(event_uid);
  }

  @Query(() => VoteGameResult, { name: "voteGameResultByEventUid" })
  findOne(
    @Args("vote_game_uid", { type: () => String }) vote_game_uid: string
  ) {
    return this.voteGameResultService.findOne(vote_game_uid);
  }

  @Mutation(() => VoteGameResult)
  updateVoteGameResult(
    @Args("updateVoteGameResultInput")
    updateVoteGameInput: UpdateVoteGameResultInput
  ) {
    return this.voteGameResultService.update(
      updateVoteGameInput.id,
      updateVoteGameInput
    );
  }

  @Mutation(() => VoteGameResult)
  removeVoteGameResult(@Args("id", { type: () => Int }) id: number) {
    return this.voteGameResultService.remove(id);
  }
}
