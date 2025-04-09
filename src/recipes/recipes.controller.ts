import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  Patch,
  Post,
  Query,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { RecipeService } from './recipes.service';
import { JwtAuthGuard } from '../common/auth/jwt.auth.guard';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllRecipes(@Query('userId') userId: string) {
    return await this.recipeService.getRecipes(Number(userId));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async createRecipe(@Body() body) {
    return await this.recipeService.createRecipe(body);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getRecipeById(@Param('id') id: string) {
    return await this.recipeService.getRecipeById(Number(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateRecipe(@Param('id') id: number, @Body() body) {
    return await this.recipeService.updateRecipe(Number(id), body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteRecipe(@Param('id') id: number) {
    return await this.recipeService.deleteRecipe(Number(id));
  }
}


