import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CreateVoteGameInput } from "./dto/create-votegame.input";
import { VoteGameService } from "./votegame.service";
import { VoteGame } from "./entities/votegame.entity";
import { UpdateVoteGameInput } from "./dto/update-votegame.input";

@Resolver(() => VoteGame)
export class VoteGameResolver {
  constructor(private readonly voteGameService: VoteGameService) {}

  @Mutation(() => VoteGame)
  createVoteGame(
    @Args("createVoteGame")
    createVoteGameInput: CreateVoteGameInput
  ) {
    return this.voteGameService.create(createVoteGameInput);
  }

  @Query(() => [VoteGame], { name: "voteGameByEventUid" })
  findAll(@Args("event_uid", { type: () => String }) event_uid: string) {
    return this.voteGameService.findAll(event_uid);
  }

  @Query(() => VoteGame, { name: "voteGameByUid" })
  findOne(@Args("uid", { type: () => String }) uid: string) {
    return this.voteGameService.findOne(uid);
  }

  @Mutation(() => VoteGame)
  updateVoteGame(
    @Args("updateVoteGameInput")
    updateVoteGameInput: UpdateVoteGameInput
  ) {
    return this.voteGameService.update(
        updateVoteGameInput.id,
        updateVoteGameInput
    );
  }

  @Mutation(() => VoteGame)
  removeVoteGame(@Args("id", { type: () => Int }) id: number) {
    return this.voteGameService.remove(id);
  }
}
