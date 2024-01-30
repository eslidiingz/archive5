import { Test, TestingModule } from '@nestjs/testing';
import { RegisterFormResolver } from './register_form.resolver';
import { RegisterFormService } from './register_form.service';

describe('RegisterFormResolver', () => {
  let resolver: RegisterFormResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterFormResolver, RegisterFormService],
    }).compile();

    resolver = module.get<RegisterFormResolver>(RegisterFormResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
