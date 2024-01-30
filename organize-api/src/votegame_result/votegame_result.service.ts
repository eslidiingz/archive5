import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { uuid } from "uuidv4";
import { CreateVoteGameResultInput } from "./dto/create-votegame_result.input";
import { UpdateVoteGameResultInput } from "./dto/update-votegame_result.input";
@Injectable()
export class VoteGameResultService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVoteGameChoiceInput: CreateVoteGameResultInput) {
    const input = { ...createVoteGameChoiceInput};

    const _result = await this.prisma.voteGameResult.create({
      data: input,
    });
    return _result;
  }

  async findAll(event_uid: string) {
    return await this.prisma.voteGameResult.findMany({
      where: {
        event_uid: event_uid,
      }
    });
  }

  async findOne(vote_game_uid: string) {
    return await this.prisma.voteGameResult.findFirst({
      where: {
        vote_game_uid: vote_game_uid,
      }
    });
  }

  async update(id: number, updateVoteGameResultInput: UpdateVoteGameResultInput) {
    const input = { ...updateVoteGameResultInput };
    return await this.prisma.voteGameResult.update({
      where: {
        id: id,
      },
      data: input,
    });
  }

  async remove(id: number) {
    return await this.prisma.voteGameResult.delete({
      where: {
        id: id,
      },
    });
  }
}
