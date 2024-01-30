import { Test, TestingModule } from '@nestjs/testing';
import { UseTicketResolver } from './use_ticket.resolver';
import { UseTicketService } from './use_ticket.service';

describe('UseTicketResolver', () => {
  let resolver: UseTicketResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseTicketResolver, UseTicketService],
    }).compile();

    resolver = module.get<UseTicketResolver>(UseTicketResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
