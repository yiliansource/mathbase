"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@/components/forms/dropdown-menu";
import { getApiUrl } from "@/lib/api";
import { ArrowRightIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export function UserWidget() {
    const [user, setUser] = useState<{ avatar: string } | null>(null);

    useEffect(() => {
        async function fetchDataAsync() {
            const res = await fetch(getApiUrl("/users/me"), { credentials: "include" });
            if (!res.ok) return;

            const json = await res.json();
            setUser(json);
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
            <MenuButton>
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                    <img src={user.avatar} className="rounded-full w-8 h-8" />
                </div>
            </MenuButton>
            <MenuItems anchor="top end">
                <MenuItem>
                    <Link className="flex flex-row items-center gap-2" href="/profile" prefetch={false}>
                        <UserIcon /> Profile
                    </Link>
                </MenuItem>
                <MenuItem className="text-red-500" onClick={logout}>
                    <SignOutIcon /> Logout
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}
