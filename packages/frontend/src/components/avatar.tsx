import { UserModel } from "@/types/user.model";
import { VariantProps, cva } from "class-variance-authority";
import { useState } from "react";

const avatarContainer = cva(["rounded-full overflow-hidden"], {
    variants: {
        size: {
            small: "size-6 text-xs",
            medium: "size-8 text-sm",
            large: "size-10 text-md",
            profile: "size-24 text-2xl",
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

export function Avatar({
    user,
    size,
}: VariantProps<typeof avatarContainer> & {
    user: UserModel;
}) {
    const [useInitials, setUseInitials] = useState<boolean>(!user.avatar);

    const initials = user.name
        .split(" ")
        .map((p) => p[0].toUpperCase())
        .join("");

    return (
        <>
            {!useInitials ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={user.avatar}
                    className={avatarContainer({ size })}
                    alt={user.name}
                    draggable={false}
                    onError={() => setUseInitials(true)}
                />
            ) : (
                <span
                    className={avatarContainer({ className: "bg-orange-200 flex items-center justify-center", size })}
                >
                    <span className="select-none">{initials}</span>
                </span>
            )}
        </>
    );
}
