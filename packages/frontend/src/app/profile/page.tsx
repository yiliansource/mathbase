"use client";

import { getApiUrl } from "@/lib/api";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(getApiUrl("/users/me"), { credentials: "include" });
            if (!res.ok) redirect("/login");
            else {
                const json = await res.json();
                setUser(json);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="mt-4 mb-4 text-5xl font-semibold">Profile</h1>

            {user && (
                <div className="flex flex-row gap-2 items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={user.avatar} alt={user.name} className="size-8 rounded-full" />
                    <p className="text-lg">{user.name}</p>
                </div>
            )}
        </div>
    );
}
