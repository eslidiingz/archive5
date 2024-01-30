import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { uuid } from "uuidv4";
import { CreateVoteGameChoiceInput } from "./dto/create-votegame_choice.input";
import { UpdateVoteGameChoiceInput } from "./dto/update-votegame_choice.input";
@Injectable()
export class VoteGameChoiceService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createVoteGameChoiceInput: CreateVoteGameChoiceInput) {
    const input = { ...createVoteGameChoiceInput, uid: uuid() };

    const _result = await this.prisma.voteGameChoices.create({
      data: input,
    });
    return _result;
  }

  async findAll(event_uid: string) {
    return await this.prisma.voteGameChoices.findMany({
      where: {
        event_uid: event_uid,
      }
    });
  }

  async findOne(uid: string) {
    return await this.prisma.voteGameChoices.findFirst({
      where: {
        uid: uid,
      }
    });
  }

  async update(id: number, updateVoteGameInput: UpdateVoteGameChoiceInput) {
    const input = { ...updateVoteGameInput };
    return await this.prisma.voteGameChoices.update({
      where: {
        id: id,
      },
      data: input,
    });
  }

  async remove(id: number) {
    return await this.prisma.voteGameChoices.delete({
      where: {
        id: id,
      },
    });
  }
}
