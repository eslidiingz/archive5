import { Module } from '@nestjs/common';
import { UseTicketService } from './use_ticket.service';
import { UseTicketResolver } from './use_ticket.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UseTicketResolver, UseTicketService, PrismaService]
})
export class UseTicketModule {}
