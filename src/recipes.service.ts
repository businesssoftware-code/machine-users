import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecipes() {
    return await this.prisma.recipe.findMany();
  }
}
