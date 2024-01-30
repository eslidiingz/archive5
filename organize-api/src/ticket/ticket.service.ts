import { Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { uuid } from 'uuidv4';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
// Function to create a new Ticket
async create(createTicketInput: CreateTicketInput) {
  try {
    const newTicket = await this.prisma.ticket.create({
      data: {
        ...createTicketInput,
        uuid: uuid(),
        amount: createTicketInput.limit
        ,
      },
    });

    const registerForm = await this.prisma.registerForm.findUnique({
      where: { uuid: createTicketInput.registerform_uid },
      include: { ticket: true }, // Include the ticket relation field
    });

    if (!registerForm) {
      throw new Error(`RegisterForm with uuid ${createTicketInput.registerform_uid} not found.`);
    }else{
      console.log("registerForm",registerForm);
    }

    // Update the RegisterForm to include the newly created Ticket
    await this.prisma.registerForm.update({
      where: { uuid: createTicketInput.registerform_uid },
      data: {
        ticket: {
          connect: { id: newTicket.id }, // Connect the Ticket with the RegisterForm
        },
      },
    });

    return newTicket;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw new Error("Failed to create ticket.");
  }
}


  async findAll() {
    return await this.prisma.ticket.findMany({
      include: {
        ticket_user: {
          include: {
            use_tickets: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  async update(id: number, updateTicketInput: UpdateTicketInput) {
    const input = { ...updateTicketInput };
    return await this.prisma.ticket.update({
      where: {
        id: id,
      },
      data: input,
    });
  }

  async remove(id: number) {
    return await this.prisma.ticket.delete({
      where: {
        id: id,
      },
    });
  }
}
