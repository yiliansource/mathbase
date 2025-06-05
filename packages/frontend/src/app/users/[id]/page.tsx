"use client";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/forms/button";
import { getApiUrl } from "@/lib/api";
import { formatRole } from "@/lib/roles";
import { UserModel } from "@/types/user.model";
import { CakeIcon, ClockIcon, PencilIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { format } from "timeago.js";

export default function UserPage() {
    const params = useParams<{ id: string }>();
    const [user, setUser] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(getApiUrl("/users/" + params.id), { credentials: "include" });
            if (res.ok) {
                const json = await res.json();
                setUser(json);
            }
            setLoading(false);
        }
        fetchData();
    }, [params.id]);

    if (!user && !loading) {
        return <div>The user could not be found.</div>;
    }

    return (
        <div className="mt-4">
            <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center">
                <div>
                    {user ? (
                        <Avatar user={user} size="profile" />
                    ) : (
                        <Skeleton className="block mb-10" circle height="100%" width="100%" />
                    )}
                </div>
                <div className="flex flex-col gap-1 lg:gap-0">
                    <div className="mb-1">
                        {user ? (
                            <div className="flex flex-row gap-3">
                                <span className="leading-6 text-2xl font-semibold">{user.name}</span>
                                <span>{formatRole(user.role)}</span>
                            </div>
                        ) : (
                            <Skeleton className="mb-1" height={24} width={280} />
                        )}
                        {/* {user ? (
                            <p className="text-sm font-semibold">{formatRole(user.role)}</p>
                        ) : (
                            <Skeleton className="mb-1" height={24} width={140} />
                        )} */}
                    </div>
                    <div className="mb-2 flex flex-col lg:flex-row gap-1 lg:gap-4 text-sm text-neutral-600">
                        <span className="flex flex-row gap-2 items-center">
                            <CakeIcon />
                            {user ? (
                                <span>Joined {format(user.createdAt)}</span>
                            ) : (
                                <Skeleton className="flex-1" width={160} />
                            )}
                        </span>
                        <span className="flex flex-row gap-2 items-center">
                            <ClockIcon />
                            {user ? (
                                <span>Last seen {format(user.lastActiveAt)}</span>
                            ) : (
                                <Skeleton className="flex-1" width={160} />
                            )}
                        </span>
                    </div>
                </div>
                <div className="hidden lg:block ml-auto mr-0 mt-0 mb-auto">
                    {user && (
                        <Button variant="secondary" size="small" as={Link} href={`/users/${user.id}/edit`}>
                            <PencilIcon /> Edit Profile
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
