import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { UserService } from '@/user/user.service';

@Controller('/v1')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/users')
  @HttpCode(HttpStatus.OK)
  getUsers(): Record<string, string | number> {
    return {
      status: 'OK',
      code: HttpStatus.OK,
      message: 'Get all users',
    };
  }

  @Get('/hello')
  @HttpCode(200)
  async getHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }
}
