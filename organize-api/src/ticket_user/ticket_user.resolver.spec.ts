import { Test, TestingModule } from '@nestjs/testing';
import { TicketUserResolver } from './ticket_user.resolver';
import { TicketUserService } from './ticket_user.service';

describe('TicketUserResolver', () => {
  let resolver: TicketUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketUserResolver, TicketUserService],
    }).compile();

    resolver = module.get<TicketUserResolver>(TicketUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
