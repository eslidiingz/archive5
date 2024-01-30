import { Test, TestingModule } from '@nestjs/testing';
import { PermissionListService } from './permission_list.service';

describe('PermissionListService', () => {
  let service: PermissionListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionListService],
    }).compile();

    service = module.get<PermissionListService>(PermissionListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
