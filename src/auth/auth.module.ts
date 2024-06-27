import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { prismaModule } from 'prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { localStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService , localStrategy , jwtStrategy],
  imports: [prismaModule , PassportModule , JwtModule.register({
    secret : 'srccrs',
    signOptions :{expiresIn : '2d'}
  })]
})
export class AuthModule {}
