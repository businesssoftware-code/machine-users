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
  async getAllRecipes() {
    return await this.recipeService.getRecipes();
  }
}
