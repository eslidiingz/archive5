import { Test, TestingModule } from '@nestjs/testing';
import { TicketUserService } from './ticket_user.service';

describe('TicketUserService', () => {
  let service: TicketUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketUserService],
    }).compile();

    service = module.get<TicketUserService>(TicketUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
