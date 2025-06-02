"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation: { label: string; href: string }[] = [
    {
        label: "About",
        href: "/",
    },
    {
        label: "Database",
        href: "/db",
    },
    {
        label: "App",
        href: "/app",
    },
];

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-row gap-6">
            {navigation.map((n) => {
                const active = n.href === "/" ? pathname === n.href : pathname.startsWith(n.href);
                return (
                    <Link
                        key={n.href}
                        href={n.href}
                        className={clsx("px-2 py-1 text-sm font-semibold hover:underline", active && "text-blue-500")}
                        prefetch={false}
                    >
                        {n.label}
                    </Link>
                );
            })}
        </nav>
    );
}
