import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecipes(userId: string) {
    return await this.prisma.recipe.findMany({where : });
  }
}
