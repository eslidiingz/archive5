import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { QuestionFormService } from "./question_form.service";
import { QuestionForm } from "./entities/question_form.entity";
import { CreateQuestionFormInput } from "./dto/create-question_form.input";
import { UpdateQuestionFormInput } from "./dto/update-question_form.input";

@Resolver(() => QuestionForm)
export class QuestionFormResolver {
  constructor(private readonly questionFormService: QuestionFormService) {}

  @Mutation(() => QuestionForm)
  createQuestionForm(
    @Args("createQuestionFormInput")
    createQuestionFormInput: CreateQuestionFormInput
  ) {
    return this.questionFormService.create(createQuestionFormInput);
  }

  @Mutation(() => Int)
  createQuestionFormList(
    @Args({
      name: "createQuestionFormInput",
      type: () => [CreateQuestionFormInput],
    })
    createQuestionFormListInput: CreateQuestionFormInput[]
  ) {
    return this.questionFormService.createList(createQuestionFormListInput);
  }

  @Query(() => [QuestionForm], { name: "questionFormByFormUid" })
  findAll(@Args("form_uid", { type: () => String }) form_uid: string) {
    return this.questionFormService.findAll(form_uid);
  }

  @Query(() => QuestionForm, { name: "questionFormByUid" })
  findOne(@Args("uid", { type: () => String }) uid: string) {
    return this.questionFormService.findOne(uid);
  }

  @Mutation(() => QuestionForm)
  updateQuestionForm(
    @Args("updateQuestionFormInput")
    updateQuestionFormInput: UpdateQuestionFormInput
  ) {
    return this.questionFormService.update(
      updateQuestionFormInput.id,
      updateQuestionFormInput
    );
  }

  @Mutation(() => QuestionForm)
  removeQuestionForm(@Args("id", { type: () => Int }) id: number) {
    return this.questionFormService.remove(id);
  }
}
