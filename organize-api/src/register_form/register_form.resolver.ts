import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { RegisterFormService } from "./register_form.service";
import { RegisterForm } from "./entities/register_form.entity";
import { CreateRegisterFormInput } from "./dto/create-register_form.input";
import { UpdateRegisterFormInput } from "./dto/update-register_form.input";
import { SummaryRegister } from "./entities/summary.entity";
import { ReportRegisterWeek } from "./entities/report_register_week.entiry";
import { SummaryEvent } from "./entities/summary_event.entity";
import { ReportUser } from "./entities/report_user.entity";
import { TopEvent } from "./entities/top_event.entity";

@Resolver(() => RegisterForm)
export class RegisterFormResolver {
  constructor(private readonly registerFormService: RegisterFormService) {}

  @Mutation(() => RegisterForm)
  createRegisterForm(
    @Args("createRegisterFormInput")
    createRegisterFormInput: CreateRegisterFormInput
  ) {
    return this.registerFormService.create(createRegisterFormInput);
  }

  @Query(() => [RegisterForm], { name: "registerFormByEventUid" })
  findregisterFormByEventUid(
    @Args("event_uid", { type: () => String }) event_uid: string
  ) {
    return this.registerFormService.findregisterFormByEventUid(event_uid);
  }

  @Query(() => [RegisterForm], {
    name: "registerFormByEventUidAndFormType",
  })
  findregisterFormByEventUidAndFormType(
    @Args("event_uid", { type: () => String }) event_uid: string,
    @Args("form_type", { type: () => String }) form_type: string
  ) {
    return this.registerFormService.findregisterFormByEventUidAndFormType(
      event_uid,
      form_type
    );
  }

  @Query(() => RegisterForm, { name: "registerFormByUid" })
  findOne(@Args("uid", { type: () => String }) uid: string) {
    return this.registerFormService.findOne(uid);
  }

  @Query(() => [RegisterForm], { name: "registerForms" })
  findAll() {
    return this.registerFormService.findAll();
  }

  @Mutation(() => RegisterForm)
  updateRegisterForm(
    @Args("updateRegisterFormInput")
    updateRegisterFormInput: UpdateRegisterFormInput
  ) {
    return this.registerFormService.update(
      updateRegisterFormInput.id,
      updateRegisterFormInput
    );
  }

  @Mutation(() => RegisterForm)
  removeRegisterForm(@Args("id", { type: () => Int }) id: number) {
    return this.registerFormService.remove(id);
  }

  @Query(() => SummaryRegister, { name: "SummaryCardDashboard" })
  SummaryRegister(
    @Args("organize_uid", { type: () => String }) organize_uid: string
  ) {
    return this.registerFormService.SummaryRegister(organize_uid);
  }

  @Query(() => [ReportRegisterWeek], {
    name: "ReportSummaryUserRegisterWeek",
  })
  ReportSummaryUserRegisterWeekOrMonth(
    @Args("organize_uid", { type: () => String }) organize_uid: string
  ) {
    return this.registerFormService.ReportUserRegisterAllInWeek(organize_uid);
  }

  @Query(() => [ReportRegisterWeek], { name: "SummaryRegisteWeekByEvent" })
  SummaryRegisteWeekByEvent(
    @Args("event_uid", { type: () => String }) event_uid: string
  ) {
    return this.registerFormService.SummaryRegisterWeekBy(event_uid);
  }

  @Query(() => SummaryEvent, { name: "SummaryCardboadByEvent" })
  SummaryCardboadByEvent(
    @Args("event_uid", { type: () => String }) event_uid: string
  ) {
    return this.registerFormService.SummaryCardboadByEvent(event_uid);
  }

  @Query(() => Number, { name: "userRegisterEvent" })
  userRegisterEvent(
    @Args("event_uid", { type: () => String }) event_uid: string
  ) {
    return this.registerFormService.userRegisterEvent(event_uid);
  }

  @Query(() => [ReportUser], { name: "ReportUserRegisterByEvent" })
  ReportUserRegisterByEvent(
    @Args("event_uid", { type: () => String }) event_uid: string
  ) {
    return this.registerFormService.ReportUserRegisterByEvent(event_uid);
  }

  @Query(() => [ReportRegisterWeek], { name: "ReportUserRegisterAllInWeek" })
  ReportUserRegisterAllInWeek(
    @Args("organize_uid", { type: () => String }) organize_uid: string
  ) {
    return this.registerFormService.ReportUserRegisterAllInWeek(organize_uid);
  }

  @Query(() => [TopEvent], { name: "Top4Report" })
  Top4Report(
    @Args("type", { type: () => String }) type: string,
    @Args("organize_uid", { type: () => String }) organize_uid: string
  ) {
    return this.registerFormService.top4Report(type, organize_uid);
  }
}
