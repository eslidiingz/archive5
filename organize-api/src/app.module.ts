import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { OrganizerModule } from "./organizer/organizer.module";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { AuthModule } from "./auth/auth.module";
import { CounterModule } from "./counter/counter.module";
import { PackageModule } from "./master/package/package.module";
import { PackageListModule } from "./master/package_list/package_list.module";
import { PermissionListModule } from "./master/permission_list/permission_list.module";
import { FormInputTypeModule } from "./master/form_input_type/form_input_type.module";
import { RegisterFormModule } from "./register_form/register_form.module";
import { QuestionFormModule } from "./question_form/question_form.module";
import { AnswerModule } from "./answer/answer.module";
import { VoteGameModule } from "./votegame/votegame.module";
import { VoteGameChoiceModule } from "./votegame_choice/votegame_choice.module";
import { VoteGameQuestionModule } from "./votegame_question/votegamequestion.module";
import { VoteGameResultModule } from "./votegame_result/votegame_result.module";
import { PromotionModule } from "./promotion/promotion.module";
import { PromotionHistoryModule } from "./promotion_history/promotion_history.module";
import { TicketModule } from "./ticket/ticket.module";
import { HttpModule } from "@nestjs/axios";
import { TicketUserModule } from "./ticket_user/ticket_user.module";
import { UseTicketModule } from "./use_ticket/use_ticket.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    HttpModule,
    OrganizerModule,
    AuthModule,
    CounterModule,
    PackageModule,
    PackageListModule,
    PermissionListModule,
    FormInputTypeModule,
    RegisterFormModule,
    QuestionFormModule,
    AnswerModule,
    VoteGameModule,
    VoteGameChoiceModule,
    VoteGameQuestionModule,
    VoteGameResultModule,
    PromotionModule,
    PromotionHistoryModule,
    TicketModule,
    TicketUserModule,
    UseTicketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
