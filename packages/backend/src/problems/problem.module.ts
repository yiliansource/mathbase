import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProblemController } from "./problem.controller";
import { Problem } from "./problem.model";
import { ProblemService } from "./problem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Problem])],
    controllers: [ProblemController],
    providers: [ProblemService],
})
export class ProblemModule {}

