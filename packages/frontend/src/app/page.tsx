import { Button } from "@headlessui/react";
import { ArrowRightIcon, DatabaseIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Home() {
    return (
        <div className="my-auto">
            <h2 className="mb-6 text-2xl text-blue-500 font-(family-name:--font-kurale)">solvely</h2>
            <h1 className="mb-8 text-7xl font-semibold tracking-tighter max-w-xl">
                Improvement, one problem at a time
            </h1>
            <p className="mb-12 text-xl text-neutral-800 max-w-2xl">
                Explore our archive of math exercises, share interesting problems and track your progress on your
                learning journey.
            </p>
            <div className="flex flex-row gap-4">
                <Button
                    className="flex flex-row gap-2 cursor-pointer items-center py-3 px-4 hover:bg-neutral-200 font-semibold text-sm rounded-md"
                    as={Link}
                    href="/db"
                >
                    <DatabaseIcon size={20} />
                    View Database
                </Button>
                <Button
                    className="flex flex-row gap-2 cursor-pointer items-center py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm rounded-md"
                    as={Link}
                    href="/app"
                >
                    To the app
                    <ArrowRightIcon size={20} />
                </Button>
            </div>
        </div>
    );
}
