import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

import { User } from "./user.model";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findById(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }
    async findByGoogleId(googleId: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ googleId });
    }

    async create(partial: DeepPartial<User>) {
        const user = this.usersRepository.create(partial);
        return this.usersRepository.save(user);
    }
}
