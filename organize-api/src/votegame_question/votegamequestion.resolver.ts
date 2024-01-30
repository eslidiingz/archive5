import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { VoteGameQuestion } from "./entities/votegamequestion.entity";
import { VoteGameQuestionService } from "./votegamequestion.service";
import { CreateQuestionFormInput } from "src/question_form/dto/create-question_form.input";
import { CreateVoteGameQuestionInput } from "./dto/create-votegamequestion.input";

@Resolver(() => VoteGameQuestion)
export class VoteGameQuestionResolver {
  constructor(private readonly voteGamesQuestions: VoteGameQuestionService) {}

  @Mutation(() => VoteGameQuestion)
  createVoteGameQuestion(
    @Args("createVoteGameQuestionInput")
    createVoteGameQuestionInput: CreateVoteGameQuestionInput
  ) {
    return this.voteGamesQuestions.create(createVoteGameQuestionInput);
  }

  @Query(() => [VoteGameQuestion], { name: "voteGameQuestionByVoteGameUid" })
  findAll(@Args("vote_game_uid", { type: () => String }) vote_game_uid: string) {
    return this.voteGamesQuestions.findAllByVoteGameUid(vote_game_uid);
  }

  @Query(() => [VoteGameQuestion], { name: "voteGameQuestionByEventUid" })
  findAllByQuestionUid(
    @Args("event_uid", { type: () => String }) event_uid: string
  ) {
    return this.voteGamesQuestions.findAllByEventUid(event_uid);
  }

  @Mutation(() => VoteGameQuestion)
  removeVoteGameQuestion(@Args("id", { type: () => Int }) id: number) {
    return this.voteGamesQuestions.remove(id);
  }
}
