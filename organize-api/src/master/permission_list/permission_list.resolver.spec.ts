import { Test, TestingModule } from '@nestjs/testing';
import { PermissionListResolver } from './permission_list.resolver';
import { PermissionListService } from './permission_list.service';

describe('PermissionListResolver', () => {
  let resolver: PermissionListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionListResolver, PermissionListService],
    }).compile();

    resolver = module.get<PermissionListResolver>(PermissionListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
