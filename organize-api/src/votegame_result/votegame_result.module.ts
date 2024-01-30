import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { VoteGameResultResolver } from "./votegame_result.resolver";
import { VoteGameResultService } from "./votegame_result.service";

@Module({
  providers: [VoteGameResultResolver, VoteGameResultService, PrismaService],
})
export class VoteGameResultModule {}
