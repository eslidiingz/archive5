import { Injectable } from '@nestjs/common';
import { CreateUseTicketInput } from './dto/create-use_ticket.input';
import { UpdateUseTicketInput } from './dto/update-use_ticket.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UseTicketService{
constructor(private readonly prisma: PrismaService) {}
  async create(createUseTicketInput: CreateUseTicketInput) {
    try {
      const useTicket = await this.prisma.ticketUser.findUnique({
        where: { ticket_no: createUseTicketInput.ticket_no },
      });
      console.log("useTicket:", useTicket);


      const findTicket = await this.prisma.ticket.findFirst({
        where: { uuid: useTicket.ticket_uid },
      });
      console.log("findTicket:", findTicket);

      const findRegisterForm = await this.prisma.registerForm.findFirst({
        where: { uuid: findTicket.registerform_uid },
      });
      console.log("findRegisterForm:", findRegisterForm);

      if (useTicket.use_status === "available") {
      const newUseTicket = await this.prisma.useTicket.create({
        data: {
          ticket_no: createUseTicketInput.ticket_no,
          ticket_user_id: useTicket.id
        },
      });

      console.log("New UseTicket:", newUseTicket);

      const updatedTicketUser = await this.prisma.ticketUser.update({
        where: { id: useTicket.id },
        data: {
          use_tickets: {
            connect: { id: newUseTicket.id },
          },
          use_status: "unavailable",
          updated_at: new Date(),
        },
        include: {
          use_tickets: true,
        },
      });

      const updatedTicket = await this.prisma.ticket.update({
        where: { id: findTicket.id },
        data: {
          ...findTicket,
          ticket_user: {
            connect: { id: updatedTicketUser.id },
          },
          updated_at: new Date(),
        },
        include: {
          ticket_user: true,
        },
      });
      console.log("Updated TicketUser:", updatedTicketUser);
      console.log("Updated Ticket:", updatedTicket);


      return await newUseTicket;
      } else {
        throw new Error("You already used.");
      }
    } catch (error) {
      console.error("Error creating UseTicket:", error);
      throw new Error("Failed to create UseTicket.");
    }
  }

  async findAll() {
    return await this.prisma.useTicket.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.useTicket.findFirst({
      where: {
        id: id,
      }
    });
  }

  async findUseTicketById(id: number) {
    return await this.prisma.useTicket.findUnique({
      where: { id: id },
    });
  }
  
  async update(id: number, updateUseTicketInput: UpdateUseTicketInput) {
    const input = { ...updateUseTicketInput };
    return await this.prisma.useTicket.update({
      where: {
        id: id,
      },
      data: input,
    });
  }

  async remove(id: number) {
    return await this.prisma.useTicket.delete({
      where: {
        id: id,
      },
    });
  }
}
