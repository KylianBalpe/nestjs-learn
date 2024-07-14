import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {
    console.info('UserRepository instantiated');
  }

  async save(firstName: string, lastName: string): Promise<User> {
    return this.prismaService.user.create({
      data: {
        firstName,
        lastName,
      },
    });
  }
}
