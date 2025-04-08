import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RecipeController {
  constructor(private readonly prisma: PrismaService) {}

  async getRecipes() {
    return await this.prisma.recipe.findMany();
  }
}
