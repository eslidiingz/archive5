import { Injectable } from '@nestjs/common';
import { CreateTicketUserInput } from './dto/create-ticket_user.input';
import { UpdateTicketUserInput } from './dto/update-ticket_user.input';
import { PrismaService } from 'src/prisma/prisma.service';

function generateRandomTicketNo(length: number): string {
  const digits = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return result;
}

@Injectable()
export class TicketUserService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createTicketUserInput: CreateTicketUserInput) {
    try {
      const ticketNoLength = 8;
      const ticketNo = generateRandomTicketNo(ticketNoLength);

      const ticket = await this.prisma.ticket.findUnique({
        where: { uuid: createTicketUserInput.ticket_uid },
      });

      // Check if the promotion limit is 0 (unlimited)
      const isUnlimited = ticket.limit === 0;

      if (!isUnlimited && ticket.amount === 0) {
        throw new Error("Ticket amount is already 0. Cannot create.");
      }
      if (isUnlimited && ticket.amount > 0) {
      const newTicketUser = await this.prisma.ticketUser.create({
        data: {
          ...createTicketUserInput,
          ticket_no: parseInt(ticketNo),
          use_status: "unavailable",
          payment_status: "pending",
          price : ticket.price,
          total: ticket.price * createTicketUserInput.quantity, // ยังไม่ได้ check ส่วนลด
        },
      });

      console.log("New Ticket:", newTicketUser);

      const updatedPromotion = await this.prisma.ticket.update({
        where: { uuid: ticket.uuid },
        data: {
          ticket_user: {
            connect: { id: newTicketUser.id },
          },
          updated_at: new Date(),
        },
        include: {
          ticket_user: true,
        },
      });

      console.log("Updated Ticket:", updatedPromotion);
      
      return await newTicketUser;
      }

    } catch (error) {
      console.error("Error creating TicketUser:", error);
      throw new Error("Failed to create TicketUser.");
    }
  }

  async updatePaymentStatus(ticket_no: number, payment_status: string) {
    try{
      const ticketUser = await this.prisma.ticketUser.findFirst({
        where: { ticket_no: ticket_no },
      });

      const ticket = await this.prisma.ticket.findUnique({
        where: { uuid: ticketUser.ticket_uid },
      });
      
      const use_status = payment_status === "paid" ? "available" : "unavailable";
      const newAmount = payment_status === "paid" ? ticket.amount - 1 : ticket.amount;
  
      const input = { ...ticket, payment_status: payment_status, use_status: use_status, update_at: new Date() };
  
      const updatedTicketUser = await this.prisma.ticketUser.update({
        where: {
          id: ticket.id,
        },
        data: input,
      });
  
      const updatedTicket = await this.prisma.ticket.update({
        where: { uuid: ticketUser.ticket_uid },
        data: {
          amount: newAmount,
          ticket_user: {
            connect: { id: updatedTicketUser.id },
          },
          updated_at: new Date(),
        },
        include: {
          ticket_user: true,
        },
      });
      console.log("Updated Ticket:", updatedTicket);

    return updatedTicketUser

    }catch(error){
      console.log(error)
    }
  }

  async updateManyOutOfAmount(ticket_uid: string) {
    try{
      const ticket = await this.prisma.ticketUser.findMany({
        where: { ticket_uid: ticket_uid },
      });
      // Update each ticket
      const updatedTickets = await Promise.all(
        ticket.map(async (ticket) => {
          if (ticket.payment_status === "pending") {
          const input = { ...ticket};

          const updatedTicketUser = await this.prisma.ticketUser.update({
            where: { ticket_no: ticket.ticket_no }, // Use the ticket_uid as the identifier
            data: {
              ...input,
              payment_status: "unpaid", // Update payment_status to "unpaid"
              use_status: "unavailable", // Update use_status to "unavailable"
            },
          });
  
          const updatedTicket = await this.prisma.ticket.update({
            where: { uuid: ticket.ticket_uid },
            data: {
              ticket_user: {
                connect: { id: ticket.id },
              },
              updated_at: new Date(),
            },
            include: {
              ticket_user: true,
            },
          });
          console.log("Updated Ticket:", updatedTicket);
        }
        return updatedTickets;
        })
      );
    }catch(error){
      console.log(error)
    }
  }

  async findAll() {
    return await this.prisma.ticketUser.findMany({
      include: {
        use_tickets: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  async remove(id: number) {
    return await this.prisma.ticketUser.delete({
      where: {
        id: id,
      },
    });
  }
}
