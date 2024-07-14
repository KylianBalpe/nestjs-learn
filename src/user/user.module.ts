import { Module } from '@nestjs/common';
import { UserController } from '@/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
