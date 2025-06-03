import { Body, Controller, Post } from "@nestjs/common";
import { CurrentUser } from "src/users/user.decorator";
import { User } from "src/users/user.model";

import { CreateProblemDto } from "./create-problem.dto";
import { ProblemService } from "./problem.service";

@Controller("problems")
export class ProblemController {
    constructor(private readonly problemService: ProblemService) {}

    @Post("new")
    async createProblem(@Body() dto: CreateProblemDto, @CurrentUser() user: User) {
        const problem = await this.problemService.create({ ...dto, authorId: user.id });
        return problem;
    }
}

