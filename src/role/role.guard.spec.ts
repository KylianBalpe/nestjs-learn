import { RoleGuard } from '@/role/role.guard';

describe('RoleGuard', () => {
  it('should be defined', () => {
    // @ts-ignore
    expect(new RoleGuard()).toBeDefined();
  });
});
