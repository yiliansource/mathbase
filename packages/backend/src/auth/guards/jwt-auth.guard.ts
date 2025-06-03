import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { SetMetadata } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JsonWebTokenError, JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Request, Response } from "express";
import { UserService } from "src/users/user.service";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private configService: ConfigService,
        private usersService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic =
            this.reflector.getAllAndOverride<boolean | undefined>(IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass(),
            ]) ?? false;

        const request: Request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();

        const token = this.extractTokenFromCookies(request);
        if (!token && !isPublic) {
            throw new UnauthorizedException();
        }

        if (token) {
            try {
                const payload = (await this.jwtService.verifyAsync(token, {
                    secret: this.configService.get("JWT_SECRET"),
                })) as { sub: string } | undefined;

                if (payload) {
                    const id = parseInt(payload.sub);
                    await this.usersService.registerActivity(id);
                    request["user"] = await this.usersService.findById(id);
                }
            } catch (err) {
                // todo: implement refresh tokens
                if (err instanceof TokenExpiredError) {
                    response.clearCookie("access_token");
                    return isPublic;
                }
                if (err instanceof JsonWebTokenError) {
                    response.clearCookie("access_token");
                    return isPublic;
                }
                throw new UnauthorizedException();
            }
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }

    private extractTokenFromCookies(request: Request): string | undefined {
        return request.cookies?.access_token as string;
    }
}
