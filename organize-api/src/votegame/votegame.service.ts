import { Injectable } from "@nestjs/common";
import { CreateVoteGameInput } from "./dto/create-votegame.input";
import { PrismaService } from "src/prisma/prisma.service";
import { uuid } from "uuidv4";
import { UpdateVoteGameInput } from "./dto/update-votegame.input";

@Injectable()
export class VoteGameService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVoteGameInput: CreateVoteGameInput) {
    const input = { ...createVoteGameInput, uid: uuid()};

    const _result = await this.prisma.voteGame.create({
      data: input,
    });
    return _result;
  }

  async findAll(event_uid: string) {
    return await this.prisma.voteGame.findMany({
      where: {
        event_uid: event_uid,
      },
      include: {
        question: true
      },
    });
  }

  async findOne(uid: string) {
    return await this.prisma.voteGame.findFirst({
      where: {
        uid: uid,
      }
    });
  }

  async update(id: number, updateVoteGameInput: UpdateVoteGameInput) {
    const input = { ...updateVoteGameInput };
    return await this.prisma.voteGame.update({
      where: {
        id: id,
      },
      data: input,
    });
  }

  async remove(id: number) {
    return await this.prisma.voteGame.delete({
      where: {
        id: id,
      },
    });
  }
}
