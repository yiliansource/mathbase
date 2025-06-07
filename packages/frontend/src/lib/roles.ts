import { UserModel } from "@/types/user.model";

export function formatRole(role: UserModel["role"]): string {
    switch (role) {
        case "guest":
            return "Guest";
        case "user":
            return "User";
        case "moderator":
            return "Moderator";
        case "administrator":
            return "Administrator";
        default:
            return "";
    }
}
