import { Test, TestingModule } from '@nestjs/testing';
import { RegisterFormService } from './register_form.service';

describe('RegisterFormService', () => {
  let service: RegisterFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterFormService],
    }).compile();

    service = module.get<RegisterFormService>(RegisterFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
