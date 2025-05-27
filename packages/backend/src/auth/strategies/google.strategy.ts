import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { UsersService } from "src/users/users.service";

import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(
        @Inject() private configService: ConfigService,
        @Inject() private authService: AuthService,
        @Inject() private usersService: UsersService,
    ) {
        super({
            clientID: configService.get("GOOGLE_CLIENT_ID")!,
            clientSecret: configService.get("GOOGLE_CLIENT_SECRET")!,
            callbackURL: configService.get("GOOGLE_CALLBACK_URL")!,
            scope: ["profile", "email"],
        });
    }

    async validate(_accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback) {
        const { id, name, photos } = profile as {
            id: string;
            name: { givenName: string; familyName: string };
            photos: { value: string }[];
        };

        const existingUser = await this.usersService.findByGoogleId(id);
        if (existingUser) return existingUser;

        const newUser = await this.authService.register({
            name: `${name.givenName} ${name.familyName}`,
            avatar: photos[0].value,
            googleId: id,
        });

        done(null, newUser);
    }
}
