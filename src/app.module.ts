import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './orm.config';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
