import {
    MenuItem as HeadlessMenuItem,
    MenuItemProps as HeadlessMenuItemProps,
    MenuItems as HeadlessMenuItems,
    MenuItemsProps as HeadlessMenuItemsProps,
} from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

export { Menu, MenuButton } from "@headlessui/react";

export function MenuItem({
    className,
    children,
    ...props
}: {
    children?: ReactNode;
} & HeadlessMenuItemProps<"span">) {
    return (
        <HeadlessMenuItem {...props}>
            <span
                className={clsx(
                    className,
                    "group flex flex-row w-full items-center gap-2 rounded-lg px-3 py-1.5 bg-white hover:bg-neutral-100 cursor-pointer",
                )}
            >
                {children}
            </span>
        </HeadlessMenuItem>
    );
}

export function MenuItems({ className, children, ...props }: HeadlessMenuItemsProps<"span">) {
    return (
        <HeadlessMenuItems
            className={clsx(
                className,
                "w-52 origin-top-right rounded-lg border border-neutral-300 p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0",
            )}
            {...props}
        >
            {children}
        </HeadlessMenuItems>
    );
}
