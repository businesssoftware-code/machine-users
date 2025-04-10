import { Module } from '@nestjs/common';
import { RecipeController } from './recipes.controller';
import { RecipeService } from './recipes.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '../../src/common/auth/jwt.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../src/users/user.service';

@Module({
  imports: [],
  controllers: [RecipeController],
  providers: [
    RecipeService,
    PrismaService,
    UserService,
    JwtService,
    ConfigService,
  ],
  exports: [],
})
export class RecipeModule {}
