import { Test, TestingModule } from '@nestjs/testing';
import { QuestionFormService } from './question_form.service';

describe('QuestionFormService', () => {
  let service: QuestionFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionFormService],
    }).compile();

    service = module.get<QuestionFormService>(QuestionFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
