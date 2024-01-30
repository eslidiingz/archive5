import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { VoteGameResolver } from "./votegame.resolver";
import { VoteGameService } from "./votegame.service";

@Module({
  providers: [VoteGameResolver, VoteGameService, PrismaService],
})
export class VoteGameModule {}
