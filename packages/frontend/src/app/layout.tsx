import { UserWidget } from "@/components/user-widget";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inconsolata, Inter, Kurale } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const inconsolata = Inconsolata({
    variable: "--font-inconsolata",
    subsets: ["latin"],
    weight: ["400"],
});

const kurale = Kurale({
    variable: "--font-kurale",
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "solvely",
};

const navigation: { label: string; href: string }[] = [
    {
        label: "About",
        href: "/",
    },
    {
        label: "Database",
        href: "/db/",
    },
    {
        label: "App",
        href: "/app",
    },
];

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={clsx(
                    [inter, kurale, inconsolata].map((f) => f.variable),
                    inter.className,
                    `antialiased`,
                )}
            >
                <div className="flex flex-col min-h-dvh mx-auto max-w-5xl px-3">
                    <header className="flex flex-row justify-between items-center h-18 select-none">
                        <div>
                            <Link href="/" className="text-2xl font-bold text-blue-500">
                                <Image
                                    src="/solvely-icon.png"
                                    width={40}
                                    height={40}
                                    alt="Solvely Logo"
                                    draggable={false}
                                />
                            </Link>
                        </div>
                        <nav className="flex flex-row gap-6">
                            {navigation.map((n) => (
                                <Link
                                    key={n.href}
                                    href={n.href}
                                    className="px-2 py-1 text-sm font-semibold"
                                    prefetch={false}
                                >
                                    {n.label}
                                </Link>
                            ))}
                        </nav>
                        <UserWidget />
                    </header>
                    <main className="flex flex-col w-full mx-auto max-w-5xl grow">{children}</main>
                    <footer className="flex flex-row justify-between items-center h-12 text-md font-mono text-neutral-400 select-none">
                        <p>Copyright &copy; {new Date().getFullYear()} solvely</p>
                        <p>
                            <Link href="https://github.com/yiliansource/solvely">
                                <GithubLogoIcon size={24} />
                            </Link>
                        </p>
                    </footer>
                </div>
            </body>
        </html>
    );
}
