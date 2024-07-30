import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { UserRepository } from '@/user/user-repository/user-repository';
import { User } from '@prisma/client';
import { ValidationFilter } from '@/validation/validation.filter';
import {
  LoginUserRequest,
  loginUserRequestValidation,
} from '@/model/login-model';
import { ValidationPipe } from '@/validation/validation.pipe';
import { TimeInterceptor } from '@/time/time.interceptor';
import { Auth } from '@/auth/auth.decorator';

@Controller('/v1/user')
export class UserController {
  constructor(
    private service: UserService,
    private userRepository: UserRepository,
  ) {}

  @UseFilters(ValidationFilter)
  @UsePipes(new ValidationPipe(loginUserRequestValidation))
  @Post('/login')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(TimeInterceptor)
  login(
    @Query('name') name: string,
    @Body(new ValidationPipe(loginUserRequestValidation))
    request: LoginUserRequest,
  ) {
    return {
      data: `Hello ${request.username}`,
    };
  }

  @HttpCode(HttpStatus.CREATED)
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

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseIntPipe) id: number): string {
    return `GET ${id}`;
  }

  @Get('/current')
  current(@Auth() user: User): Record<string, any> {
    return {
      data: `Hello ${user.firstName} ${user.lastName}`,
    };
  }
}
