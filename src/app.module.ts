import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { AppController } from './app.update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TaskEntity } from './task.entity';

const session = new LocalSession({database: 'session_db.json'})

@Module({
  imports: [
    TelegrafModule.forRoot({
    middlewares: [session.middleware()],
    token:  '7337787306:AAFokX_sEC7wro8h6ODA3NcS0qDO-90DuOY'
   },
 ),
  TypeOrmModule.forRoot({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'macbook',
   password: 'password',
   database: 'telegram-bot',
   entities: [join(__dirname, '**', '*entity.{ts,js')],
   migrations: [join(__dirname, '**', '*migrations.{ts,js')],
   synchronize: true,
  }),
  TypeOrmModule.forFeature([TaskEntity])
],
  controllers: [],
  providers: [AppService, AppController],
})
export class AppModule {}
