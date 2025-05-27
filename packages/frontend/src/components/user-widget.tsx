"use client";

import { getApiUrl } from "@/lib/api";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowRightIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const dropdownItems: {
    label: string;
    icon: React.ReactNode;
    href: string;
}[] = [
    {
        label: "Profile",
        icon: <UserIcon />,
        href: "/profile",
    },
    {
        label: "Logout",
        icon: <SignOutIcon />,
        href: getApiUrl("/auth/logout"),
    },
];

export function UserWidget() {
    const [user, setUser] = useState<{ avatar: string } | null>(null);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(getApiUrl("/users/me"), { credentials: "include" });
            if (!res.ok) return;

            const json = await res.json();
            setUser(json);
        }
        fetchData();
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
            <MenuItems
                anchor="top end"
                className="w-52 origin-top-right rounded-lg border border-neutral-300 p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
                {dropdownItems.map((item) => (
                    <MenuItem key={item.label}>
                        <Link
                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-neutral-100"
                            href={item.href}
                            prefetch={false}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}
