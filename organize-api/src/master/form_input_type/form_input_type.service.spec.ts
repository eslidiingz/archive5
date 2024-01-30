import { Test, TestingModule } from "@nestjs/testing";
import { FormInputTypeService } from "./form_input_type.service";

describe("FormInputTypeService", () => {
  let service: FormInputTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormInputTypeService],
    }).compile();

    service = module.get<FormInputTypeService>(FormInputTypeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
