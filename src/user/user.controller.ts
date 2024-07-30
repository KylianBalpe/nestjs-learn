import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { UserRepository } from '@/user/user-repository/user-repository';
import { User } from '@prisma/client';

@Controller('/v1')
export class UserController {
  constructor(
    private service: UserService,
    private userRepository: UserRepository,
  ) {}

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
  // @UseFilters(ValidationFilter)
  @HttpCode(HttpStatus.OK)
  async getHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }

  @Get('/create')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName?: string,
  ): Promise<Record<string, string | number | User>> {
    if (!firstName) {
      throw new HttpException(
        {
          code: 400,
          errors: "First name can't be empty",
        },
        400,
      );
    }
    const data = await this.userRepository.save(firstName, lastName);

    return {
      status: 'CREATED',
      code: HttpStatus.CREATED,
      data,
    };
  }
}
