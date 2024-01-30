import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketUserService } from './ticket_user.service';
import { TicketUser } from './entities/ticket_user.entity';
import { CreateTicketUserInput } from './dto/create-ticket_user.input';
import { UpdateTicketUserInput } from './dto/update-ticket_user.input';

@Resolver(() => TicketUser)
export class TicketUserResolver {
  constructor(private readonly ticketUserService: TicketUserService) {}

  @Mutation(() => TicketUser)
  createTicketUser(@Args('createTicketUserInput') createTicketUserInput: CreateTicketUserInput) {
    return this.ticketUserService.create(createTicketUserInput);
  }

  @Query(() => [TicketUser], { name: 'ticketUser' })
  findAll() {
    return this.ticketUserService.findAll();
  }

  @Query(() => TicketUser, { name: 'ticketUserById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ticketUserService.findOne(id);
  }

  @Mutation(() => TicketUser)
  updatePaymentStatusOutOfAmount(@Args('ticket_uid') ticket_uid: string) {
    return this.ticketUserService.updateManyOutOfAmount(ticket_uid);
  }

  @Mutation(() => TicketUser)
  updateTicketUserPaymentStatus(@Args('ticket_no') ticket_no: number, @Args('payment_status') payment_status: string) {
    return this.ticketUserService.updatePaymentStatus(ticket_no, payment_status);
  }

  @Mutation(() => TicketUser)
  removeTicketUser(@Args('id', { type: () => Int }) id: number) {
    return this.ticketUserService.remove(id);
  }
}
