import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateProblemDto } from "./create-problem.dto";
import { Problem } from "./problem.model";

@Injectable()
export class ProblemService {
    constructor(@InjectRepository(Problem) private readonly problemRepo: Repository<Problem>) {}

    async create(dto: CreateProblemDto): Promise<Problem> {
        const newProblem = this.problemRepo.create({
            content: dto.content,
            authorId: dto.authorId,
            source: dto.source,
            tags: dto.tags,
        });
        const problem = await this.problemRepo.save(newProblem);
        return problem;
    }
}

