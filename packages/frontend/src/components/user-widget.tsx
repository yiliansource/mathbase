"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@/components/forms/dropdown-menu";
import { getApiUrl } from "@/lib/api";
import { UserModel, UserSchema } from "@/types/user.model";
import { ArrowRightIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Avatar } from "./avatar";

export function UserWidget() {
    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        async function fetchDataAsync() {
            const res = await fetch(getApiUrl("/users/me"), { credentials: "include" });
            if (!res.ok) return;

            const json = await res.json();
            const parsedUser = UserSchema.parse(json);
            setUser(parsedUser);
        }
        fetchDataAsync();
    }, []);

    const logout = useCallback(() => {
        async function logoutAsync() {
            await fetch(getApiUrl("/auth/logout"), { redirect: "manual", credentials: "include" });
            setUser(null);
        }
        logoutAsync();
    }, []);

    if (!user) {
        return (
            <Link href="/login" className="flex flex-row items-center gap-1.5 text-sm font-semibold">
                <span>Log in</span>
                <span>
                    <ArrowRightIcon />
                </span>
            </Link>
        );
    }

    return (
        <Menu>
            <MenuButton tabIndex={-1}>
                <div>
                    <Avatar user={user} size="medium" />
                </div>
            </MenuButton>
            <MenuItems anchor="top end" className="relative z-10">
                <Link className="flex flex-row items-center w-full gap-2" href={"/users/" + user.id} prefetch={false}>
                    <MenuItem>
                        <UserIcon /> Profile
                    </MenuItem>
                </Link>
                <MenuItem className="text-red-500" onClick={logout}>
                    <SignOutIcon /> Logout
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}
