import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should return hello', async () => {
    const response = await controller.getHello('Iqbal');
    expect(response).toBe('Hello Iqbal');
  });
});
