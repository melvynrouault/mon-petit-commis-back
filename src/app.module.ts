import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './orm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
