import { Test, TestingModule } from '@nestjs/testing';
import { QuestionFormResolver } from './question_form.resolver';
import { QuestionFormService } from './question_form.service';

describe('QuestionFormResolver', () => {
  let resolver: QuestionFormResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionFormResolver, QuestionFormService],
    }).compile();

    resolver = module.get<QuestionFormResolver>(QuestionFormResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
