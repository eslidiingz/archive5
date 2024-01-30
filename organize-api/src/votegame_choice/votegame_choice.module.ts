import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { VoteGameChoiceResolver } from "./votegame_choice.resolver";
import { VoteGameChoiceService } from "./votegame_choice.service";

@Module({
  providers: [VoteGameChoiceResolver, VoteGameChoiceService, PrismaService],
})
export class VoteGameChoiceModule {}
