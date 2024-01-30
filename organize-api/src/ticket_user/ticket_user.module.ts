import { Module } from '@nestjs/common';
import { TicketUserService } from './ticket_user.service';
import { TicketUserResolver } from './ticket_user.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TicketUserResolver, TicketUserService, PrismaService]
})
export class TicketUserModule {}
