import { Role } from "src/auth/role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    avatar: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    lastActiveAt: Date;

    @Column({ type: "enum", enum: Role, default: Role.User })
    role: Role;

    @Column({ unique: true, select: false })
    googleId: string;
}
