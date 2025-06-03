import { InferenceClient } from "@huggingface/inference";
import { Injectable } from "@nestjs/common";

import { LlmProvider } from "../interfaces/llm-provider.interface";

@Injectable()
export class HuggingfaceProvider implements LlmProvider {
    private client = new InferenceClient(process.env.HUGGINGFACE_API_TOKEN);

    async imageToProblemText(image: Buffer): Promise<string> {
        const imageUrl = `data:image/jpeg;base64,${image.toString("base64")}`;

        try {
            const chatCompletion = await this.client.chatCompletion({
                provider: "nebius",
                model: "google/gemma-3-27b-it",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: "parse this math problem image into markdown. transcribe any actual problem description or instructions from the image as markdown text. put all equations exactly as shown in the image into one or more latex code blocks. do not add extra instructions or interpret the meaning. do not rephrase or explain anything — just transcribe what’s actually there. use the $$ ... $$ syntax for LaTeX. if the image is not of a problem, return absolutely nothing.",
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: imageUrl,
                                },
                            },
                        ],
                    },
                ],
                parameters: {
                    temperature: 0.2,
                    top_p: 0.9,
                    max_new_tokens: 512,
                },
            });
            return chatCompletion.choices[0].message.content!;
        } catch (error) {
            throw error;
        }
    }
}

