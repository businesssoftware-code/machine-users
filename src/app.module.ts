import { Module } from '@nestjs/common';
import { RecipeModule } from './recipes/recipes.module';

@Module({
  imports: [RecipeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
