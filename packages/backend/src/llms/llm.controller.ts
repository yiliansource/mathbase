import {
    Body,
    Controller,
    FileTypeValidator,
    InternalServerErrorException,
    Logger,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { Public } from "src/auth/guards/jwt-auth.guard";

import { LlmService } from "./llm.service";

@Controller("llms")
export class LlmController {
    private readonly logger = new Logger(LlmService.name);

    constructor(private readonly modelService: LlmService) {}

    @Post("image-to-problem-text")
    @UseInterceptors(FileInterceptor("inputImage"))
    async createProblem(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1000 * 1000 * 10 }),
                    new FileTypeValidator({ fileType: /^image\/(jpeg|png|jpg)$/ }),
                ],
            }),
        )
        imageFile: Express.Multer.File,
    ) {
        try {
            const result = await this.modelService.imageToProblemText(imageFile.buffer);
            return { result };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}

