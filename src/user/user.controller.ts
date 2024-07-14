import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { UserService } from '@/user/user.service';

type HelloResponse = {
  status: string;
  code: number;
  message: string;
};

@Controller('/v1')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/users')
  @HttpCode(200)
  getUsers(): Record<string, string | number> {
    return {
      status: 'OK',
      code: 200,
      message: 'Get all users',
    };
  }

  @Get('/hello')
  @HttpCode(200)
  async getHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }
}
