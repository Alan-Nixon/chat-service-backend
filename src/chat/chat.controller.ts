import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./chat.service";

@Controller()
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post('logout')
    async logout(@Body('userId') userId: string) {
        await this.service.logout(userId);
        return { message: 'Logout successful' };
    }
}
 