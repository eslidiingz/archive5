import { Test, TestingModule } from '@nestjs/testing';
import { FormInputTypeResolver } from './form_input_type.resolver';
import { FormInputTypeService } from './form_input_type.service';

describe('FormInputTypeResolver', () => {
  let resolver: FormInputTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormInputTypeResolver, FormInputTypeService],
    }).compile();

    resolver = module.get<FormInputTypeResolver>(FormInputTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
