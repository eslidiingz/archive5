import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseTicketService } from './use_ticket.service';
import { UseTicket } from './entities/use_ticket.entity';
import { CreateUseTicketInput } from './dto/create-use_ticket.input';
import { UpdateUseTicketInput } from './dto/update-use_ticket.input';

@Resolver(() => UseTicket)
export class UseTicketResolver {
  constructor(private readonly useTicketService: UseTicketService) {}

  @Mutation(() => UseTicket)
  createUseTicket(@Args('createUseTicketInput') createUseTicketInput: CreateUseTicketInput) {
    return this.useTicketService.create(createUseTicketInput);
  }

  @Query(() => [UseTicket], { name: 'UseTicket' })
  findAll() {
    return this.useTicketService.findAll();
  }

  @Query(() => UseTicket, { name: 'UseTicketById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.useTicketService.findOne(id);
  }

  @Mutation(() => UseTicket)
  updateUseTicket(@Args('updateUseTicketInput') updateUseTicketInput: UpdateUseTicketInput) {
    return this.useTicketService.update(updateUseTicketInput.id, updateUseTicketInput);
  }

  @Mutation(() => UseTicket)
  removeUseTicket(@Args('id', { type: () => Int }) id: number) {
    return this.useTicketService.remove(id);
  }
}
