import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    app.setGlobalPrefix("api");
    app.enableCors({
        origin: config.get<string>("FRONTEND_URL")!,
        credentials: true,
    });
    app.use(cookieParser());

    const port = config.get<number>("PORT")!;

    await app.listen(port);

    console.log(`Backend running at http://localhost:${port}/api/.`);
}
void bootstrap();
