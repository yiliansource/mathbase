import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from "joi";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Problem } from "./problems/problem.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DATABASE_NAME: Joi.string(),
                DATABASE_USER: Joi.string(),
                DATABASE_PASSWORD: Joi.string(),
                PORT: Joi.number().port().default(3001),
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: configService.get<string>("DATABASE_USER"),
                password: configService.get<string>("DATABASE_PASSWORD"),
                database: configService.get<string>("DATABASE_NAME"),
                entities: [Problem],
                synchronize: true,
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
