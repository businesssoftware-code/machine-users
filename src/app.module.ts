import { Module } from '@nestjs/common';
import { RecipeModule } from './recipes/recipes.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [RecipeModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
