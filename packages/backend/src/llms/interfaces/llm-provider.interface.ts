export interface LlmProvider {
    imageToProblemText(image: Buffer): Promise<string>;
}

