import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { UserRepository } from '@/user/user-repository/user-repository';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { UserModule } from '@/user/user.module';
import { ValidationService } from '@/validation/validation.service';
import { ValidationModule } from '@/validation/validation.module';
import { LogMiddleware } from '@/log/log.middleware';
import { AuthMiddleware } from '@/auth/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from '@/role/role.guard';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: [new winston.transports.Console()],
    }),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ValidationModule.forRoot(true),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UserRepository,
    ValidationService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({
      path: '/v1/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/v1/user/current',
      method: RequestMethod.GET,
    });
  }
}
