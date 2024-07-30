import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    const userId = Number(req.headers['x-user-id']);
    if (!userId) {
      throw new HttpException('Unauthorized', 401);
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      req.user = user;
      next();
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
