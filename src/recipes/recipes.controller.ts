import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { RecipeService } from './recipes.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllRecipes(@Query('userId') userId: string) {
    return await this.recipeService.getRecipes(Number(userId));
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createRecipe(@Body() body) {
    return await this.recipeService.createRecipe(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getRecipeById(@Param('id') id: string) {
    return await this.recipeService.getRecipeById(Number(id));
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateRecipe(@Param('id') id: number, @Body() body) {
    return await this.recipeService.updateRecipe(Number(id), body);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteRecipe(@Param('id') id: number) {
    return await this.recipeService.deleteRecipe(Number(id));
  }
}
