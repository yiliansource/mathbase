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

function isRouteActive(route: string, pathname: string): boolean {
    return route === "/" ? pathname === route : pathname.startsWith(route);
}

export function DesktopNavigation() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-row gap-6">
            {navigation.map((n) => {
                const active = isRouteActive(n.href, pathname);
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

export function MobileNavigation({ onNavigate }: { onNavigate?: (s: string) => void }) {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-2 items-end text-right">
            {navigation.map((n) => {
                const active = isRouteActive(n.href, pathname);
                return (
                    <Link
                        key={n.href}
                        href={n.href}
                        className={clsx("px-2 py-1 text-md font-semibold hover:underline", active && "text-blue-500")}
                        prefetch={false}
                        onClick={() => onNavigate?.(n.href)}
                    >
                        {n.label}
                    </Link>
                );
            })}
        </nav>
    );
}
