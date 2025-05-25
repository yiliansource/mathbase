import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Problem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @CreateDateColumn()
    publishedAt: Date;
}
