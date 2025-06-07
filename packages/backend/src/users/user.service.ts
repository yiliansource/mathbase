import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/auth/role.enum";
import { DeepPartial, Repository } from "typeorm";

import { User } from "./user.model";

@Injectable()
export class UserService {
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

        const totalUsers = await this.usersRepository.count();
        if (totalUsers === 0) {
            user.role = Role.Admin;
        }

        return this.usersRepository.save(user);
    }

    async registerActivity(userId: number) {
        await this.usersRepository.update(userId, {
            lastActiveAt: new Date(),
        });
    }
}
