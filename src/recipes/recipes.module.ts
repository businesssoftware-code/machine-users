import { Module } from '@nestjs/common';
import { RecipeController } from './recipes.controller';
import { RecipeService } from './recipes.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService],
  exports: [],
})
export class RecipeModule {}
