import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '../../src/common/auth/jwt.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, ConfigService],
  exports: [],
})
export class UserModule {}
