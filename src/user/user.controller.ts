import { Controller, Get, HttpCode, Query } from '@nestjs/common';

type HelloResponse = {
  status: string;
  code: number;
  message: string;
};

@Controller('/v1')
export class UserController {
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
  async getHello(
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
  ): Promise<HelloResponse> {
    return {
      status: 'OK',
      code: 200,
      message: `Hello ${firstName} ${lastName}`,
    };
  }
}
