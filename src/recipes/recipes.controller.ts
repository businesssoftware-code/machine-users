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
} from '@nestjs/common';
import { RecipeService } from './recipes.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllRecipes(@Query('userId') userId: number) {
    return await this.recipeService.getRecipes(userId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createRecipe(@Query('userId') userId: number) {
    return await this.recipeService.getRecipes(userId);
  }
}
