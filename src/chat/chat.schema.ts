import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    Email: string;

    @Prop({ required: true })
    Password: string;

    @Prop({ required: true })
    userName: string;

    @Prop({ required: true, default: 0 })
    Phone: number;

    @Prop({ required: true, default: false })
    IsAdmin: boolean;

    @Prop({ required: true, default: false })
    IsBlocked: boolean;

    @Prop({ required: true, default: [] })
    blockedUsers: string[]

    @Prop({ required: true, default: false })
    lastSeen: string;
}

export const UserSchema = SchemaFactory.createForClass(User).set('timestamps', true);


export type ChatDocument = Chat & Document

@Schema()
export class Chat {

    @Prop({ required: true, default: "" })
    from: string

    @Prop({ required: true, default: "" })
    to: string

    @Prop({ required: true, default: "" })
    message: string

    @Prop({ required: true, default: "" })
    type: string

    @Prop({ required: true, default: [] })
    archived: string[]

    @Prop({ required: true, default: false })
    seen: boolean
}

export const ChatSchema = SchemaFactory.createForClass(Chat).set('timestamps', true);
