import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@/user/user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: [],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should return hello', async () => {
    const response = await controller.getHello('Iqbal', 'Pamula');
    expect(response.status).toEqual('OK');
    expect(response.code).toEqual(200);
    expect(response.message).toEqual('Hello Iqbal Pamula');
  });
});
