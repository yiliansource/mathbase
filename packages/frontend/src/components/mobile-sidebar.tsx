"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { motion } from "motion/react";
import { useState } from "react";

import { Button } from "./forms/button";
import { MobileNavigation } from "./navigation";
import { UserWidgetActions } from "./user-widget";

export function MobileSidebar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const sidebarWidth = 220;

    return (
        <div className="relative">
            <Button variant="secondary" onClick={() => setSidebarOpen(true)}>
                <ListIcon size={18} />
            </Button>
            <div
                className={clsx(
                    "fixed z-10 top-0 left-0 right-0 bottom-0 bg-black/50 transition-all",
                    isSidebarOpen ? "opacity-100 backdrop-blur-xs" : "opacity-0 backdrop-blur-none pointer-events-none",
                )}
                onClick={() => setSidebarOpen(false)}
            ></div>
            <motion.div
                style={{
                    width: sidebarWidth,
                    translateX: isSidebarOpen ? 0 : sidebarWidth,
                }}
                className={clsx(
                    "fixed z-20 top-0 bottom-0 right-0 bg-white transition-all flex flex-col p-4",
                    isSidebarOpen ? "shadow-2xl" : "shadow-none",
                )}
            >
                <div className="ml-auto mr-0 p-2" onClick={() => setSidebarOpen(false)}>
                    <XIcon size={24} />
                </div>
                <div className="mt-8">
                    <MobileNavigation onNavigate={() => setSidebarOpen(false)} />
                </div>
                <div className="mt-12 mr-0 ml-auto">
                    <UserWidgetActions onAction={() => setSidebarOpen(false)} />
                </div>
            </motion.div>
        </div>
    );
}
