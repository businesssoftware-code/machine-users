import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecipes(userId: number) {
    return await this.prisma.recipe.findMany({
      where: { userId },
      include: {
        RecipeLiquid: true, // 👈 This includes RecipeLiquid[]
      },
    });
  }

  async createRecipe(body) {
    return await this.prisma.recipe.create({
      data: {
        name: body.name,
        blending: body.blending,
        userId: body.userId,
        RecipeLiquid: {
          create: body.liquids.map((liquid) => ({
            label: liquid.label,
            quantity: liquid.quantity,
            liquidId: liquid.liquidId,
          })),
        },
      },
    });
  }


}
