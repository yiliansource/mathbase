import { Inject, Injectable } from "@nestjs/common";

import { LlmProvider } from "./interfaces/llm-provider.interface";

@Injectable()
export class LlmService {
    constructor(@Inject("MODEL_PROVIDER") private readonly provider: LlmProvider) {}

    imageToProblemText(image: Buffer): Promise<string> {
        return this.provider.imageToProblemText(image);
    }
}

