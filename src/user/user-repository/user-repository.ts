import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UserRepository {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {
    this.logger.info('Create User Repository');
  }

  async save(firstName: string, lastName: string): Promise<User> {
    this.logger.info('Create User');
    return this.prismaService.user.create({
      data: {
        firstName,
        lastName,
      },
    });
  }
}
