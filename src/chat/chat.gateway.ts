import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import utility from 'util-functions-nodejs';
import { UserService } from './chat.service';

@WebSocketGateway({
    cors: { origin: '*' }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    onlineUsers: {};
    constructor(
        private readonly UserModel: UserService,
        private readonly service: UserService
    ) { this.onlineUsers = {} }

    @WebSocketServer() server: Server;

    private logger: Logger = new Logger('ChatGateway');

    afterInit(server: Server) {
        this.logger.log('WebSocket Gateway Initialized');
    }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }


    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('join')
    handleJoin(_: any, userId: any) {
        this.onlineUsers[userId] = "online"
        this.server.socketsJoin(userId)
    }

    @SubscribeMessage('isOnline')
    async handleIsOnline(_: any, { selectedUser, userId }: any) {

        const userData = await this.UserModel.getUserById(selectedUser);
        let lastSeen: string = utility.getDate(0, userData.lastSeen);
        if (this.onlineUsers[selectedUser]) {
            lastSeen = this.onlineUsers[selectedUser] === "online" ? this.onlineUsers[selectedUser] : utility.getDate(0, this.onlineUsers[selectedUser])
        }
        this.server.emit("isOnline", { lastSeen, lastUserId: selectedUser })

    }

    @SubscribeMessage("log_online")
    handleLogout(_: any, { userId, lastSeen }: any) {
        this.onlineUsers[userId] = lastSeen + "" === "online" ? lastSeen : utility.getDate(0, lastSeen)
        this.server.emit("isOnline", { lastSeen: this.onlineUsers[userId], lastUserId: userId })
    }

    @SubscribeMessage("input_message_send")
    async handleMessage(_: any, message: any) {
        const userData = await this.UserModel.getUserById(message.to);
        if (!userData.blockedUsers.includes(message.from)) {
            const insertedMsg = await this.service.saveMessage(message)
            this.server.emit("input_message_send", insertedMsg)
        }
    }

    @SubscribeMessage("started_typing")
    handleTyping(_, payload) {
        this.server.emit("started_typing", payload)
    }

    @SubscribeMessage("block_user")
    handleBlock(_, payload) {
        this.server.emit("block_user", payload)
    }
}

