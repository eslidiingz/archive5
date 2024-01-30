import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AnswerService } from "./answer.service";
import { Answer } from "./entities/answer.entity";
import { CreateAnswerInput } from "./dto/create-answer.input";

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => Answer)
  createAnswer(
    @Args("createAnswerInput")
    createAnswerInput: CreateAnswerInput
  ) {
    return this.answerService.create(createAnswerInput);
  }

  @Mutation(() => Int)
  createAnswerList(
    @Args({ name: "createAnswerInput", type: () => [CreateAnswerInput] })
    createAnswerInput: CreateAnswerInput[]
  ) {
    return this.answerService.createList(createAnswerInput);
  }

  @Query(() => [Answer], { name: "answerByFormUid" })
  findAll(@Args("form_uid", { type: () => String }) form_uid: string) {
    return this.answerService.findAll(form_uid);
  }

  @Query(() => [Answer], { name: "answerByQuestionUid" })
  findAllByQuestionUid(
    @Args("question_uid", { type: () => String }) question_uid: string
  ) {
    return this.answerService.findAllByQuestionUid(question_uid);
  }

  @Mutation(() => Answer)
  removeAnswer(@Args("id", { type: () => Int }) id: number) {
    return this.answerService.remove(id);
  }
}
