import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { CurrentUser } from "src/users/user.decorator";
import { User } from "src/users/user.model";

import { AuthService } from "./auth.service";
import { GoogleOauthGuard } from "./guards/google-oauth.guard";
import { Public } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
    ) {}

    @Get("google")
    @Public()
    @UseGuards(GoogleOauthGuard)
    async googleAuth() {}

    @Get("google/callback")
    @Public()
    @UseGuards(GoogleOauthGuard)
    async googleAuthRedirect(@Res() res: Response, @CurrentUser() user: User) {
        const jwt = await this.authService.login(user);

        res.cookie("access_token", jwt.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 2 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        res.redirect(this.configService.get<string>("FRONTEND_URL")!);
    }

    @Get("logout")
    logout(@Res() res: Response) {
        res.clearCookie("access_token");
        res.redirect(this.configService.get<string>("FRONTEND_URL")!);
    }
}
