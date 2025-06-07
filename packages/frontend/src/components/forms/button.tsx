import { Button as HeadlessButton, ButtonProps as HeadlessButtonProps } from "@headlessui/react";
import { VariantProps, cva } from "class-variance-authority";
import { ElementType } from "react";

const button = cva(["flex flex-row gap-2 cursor-pointer items-center rounded-md font-semibold text-sm"], {
    variants: {
        variant: {
            secondary: "bg-neutral-100 hover:bg-neutral-200",
            primary: "bg-blue-500 hover:bg-blue-600 text-white",
        },
        size: {
            small: "py-2 px-3",
            medium: "py-3 px-4",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "small",
    },
});

export type ButtonProps<TTag extends ElementType = "button"> = VariantProps<typeof button> & HeadlessButtonProps<TTag>;

export function Button<TTag extends ElementType>({ variant, size, ...props }: ButtonProps<TTag>) {
    return <HeadlessButton className={button({ variant, size })} {...props} />;
}
