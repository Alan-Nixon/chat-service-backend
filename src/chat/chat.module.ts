import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { UserService } from './chat.service';
import { Chat, ChatSchema, User, UserSchema } from './chat.schema';
import { UserController } from './chat.controller';

const usrMonModule = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]);
const chtMonModule = MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }])

@Module({
  imports: [usrMonModule,chtMonModule],
  providers: [ChatGateway, UserService],
  controllers: [UserController]
})

export class ChatModule { }
