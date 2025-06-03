import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Problem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @CreateDateColumn()
    publishedAt: Date;

    @UpdateDateColumn()
    lastEditedAt: Date;

    @Column({ type: "integer" })
    authorId: number;

    @Column("simple-array", { nullable: true })
    tags: string[];

    @Column({ type: "text" })
    source: string;
}

