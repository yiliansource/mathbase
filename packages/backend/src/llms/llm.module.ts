import { Module } from "@nestjs/common";

import { LlmController } from "./llm.controller";
import { LlmService } from "./llm.service";
import { HuggingfaceProvider } from "./providers/huggingface.provider";

@Module({
    controllers: [LlmController],
    providers: [
        HuggingfaceProvider,
        {
            provide: "MODEL_PROVIDER",
            useClass: HuggingfaceProvider,
        },
        LlmService,
    ],
    exports: [LlmService],
})
export class LlmModule {}

