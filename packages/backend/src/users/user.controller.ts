import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { Public } from "src/auth/guards/jwt-auth.guard";

import { CurrentUser } from "./user.decorator";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private usersService: UserService) {}

    @Get("me")
    findMe(@CurrentUser() user: User) {
        return user;
    }

    @Get(":id")
    @Public()
    async findById(@Param("id") id: number) {
        const user = await this.usersService.findById(id);
        if (!user) throw new NotFoundException();

        return user;
    }
}
