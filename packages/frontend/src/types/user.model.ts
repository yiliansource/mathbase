import { z } from "zod/v4";

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    avatar: z.string().optional(),
    createdAt: z.string().pipe(z.coerce.date()),
    lastActiveAt: z.string().pipe(z.coerce.date()),
    role: z.enum(["guest", "user", "moderator", "administrator"]),
});

export type UserModel = z.output<typeof UserSchema>;
