import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { prismaModule } from 'prisma/prisma.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[prismaModule]
})
export class UserModule {}
