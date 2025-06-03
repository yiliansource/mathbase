// TODO: validation

export class CreateProblemDto {
    content: string;
    authorId?: number;
    source: string;
    tags: string[];
}

