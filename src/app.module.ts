import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonLoggerModule } from './winston-logger/winston-logger.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';

const EnvConfig = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ".env"
})

@Module({
  imports: [WinstonLoggerModule, EnvConfig, ChatModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
