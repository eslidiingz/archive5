import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { VoteGameQuestionResolver } from "./votegamequestion.resolver";
import { VoteGameQuestionService } from "./votegamequestion.service";

@Module({
  providers: [VoteGameQuestionResolver, VoteGameQuestionService, PrismaService],
})
export class VoteGameQuestionModule {}
