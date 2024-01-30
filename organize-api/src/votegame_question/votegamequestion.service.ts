import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateVoteGameQuestionInput } from "./dto/create-votegamequestion.input";
import { uuid } from "uuidv4";

@Injectable()
export class VoteGameQuestionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVoteGameQuestionInput: CreateVoteGameQuestionInput) {
    const input = { ...createVoteGameQuestionInput, uid: uuid() };

    const _result = await this.prisma.voteGameQuestion.create({
      data: input,
    });
    return _result;
  }

  async findAllByVoteGameUid(vote_game_uid: string) {
    return await this.prisma.voteGameQuestion.findMany({
      where: {
        vote_game_uid: vote_game_uid,
      },
    });
  }

  async findAllByEventUid(event_uid: string) {
    return await this.prisma.voteGameQuestion.findMany({
      where: {
        event_uid: event_uid,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.voteGameQuestion.delete({
      where: {
        id: id,
      },
    });
  }
}
