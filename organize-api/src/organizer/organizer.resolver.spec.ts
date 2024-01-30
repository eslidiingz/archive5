import { Test, TestingModule } from '@nestjs/testing';
import { OrganizerResolver } from './organizer.resolver';
import { OrganizerService } from './organizer.service';

describe('OrganizerResolver', () => {
  let resolver: OrganizerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizerResolver, OrganizerService],
    }).compile();

    resolver = module.get<OrganizerResolver>(OrganizerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
