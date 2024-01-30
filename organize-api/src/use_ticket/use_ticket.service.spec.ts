import { Test, TestingModule } from '@nestjs/testing';
import { UseTicketService } from './use_ticket.service';

describe('UseTicketService', () => {
  let service: UseTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseTicketService],
    }).compile();

    service = module.get<UseTicketService>(UseTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
