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
    const recipeLiquids = await Promise.all(
      body.liquids.map(async ({ label, quantity }) => {
        const liquid = await this.prisma.liquid.upsert({
          where: { name: label },
          update: {},
          create: { name: label },
        });
  
        return {
          label,
          quantity,
          liquidId: liquid.id,
        };
      }),
    );
  
    return this.prisma.recipe.create({
      data: {
        name: body.name,
        blending: body.blending,
        userId :body.userId,
        RecipeLiquid: {
          create: recipeLiquids,
        },
      },
    });
  }
  
  async getRecipeById(id: number) {
    return await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        RecipeLiquid: {
          include: { liquid: true },
        },
      },
    });
  }

  async updateRecipe(id: number, body) {
    // Delete old liquids first
    await this.prisma.recipeLiquid.deleteMany({ where: { recipeId: id } });

    return await this.prisma.recipe.update({
      where: { id },
      data: {
        name: body.name,
        blending: body.blending,
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

  async deleteRecipe(id: number) {
    return await this.prisma.recipe.delete({ where: { id } });
  }
}
