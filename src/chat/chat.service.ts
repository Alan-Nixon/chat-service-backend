import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument, User, UserDocument } from './chat.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private User: Model<UserDocument>,
        @InjectModel(Chat.name) private Chat:Model<ChatDocument>
    ) { }

    async getUserById(userId: string) {
        return await this.User.findById(userId) 
    }

    async logout(userId:string) {
        const userData = await this.User.findById(userId)
        userData.lastSeen = new Date() + ""
        await userData.save()
    }

    async saveMessage(message) {
        return (await this.Chat.insertMany(message))[0]
    }

}
