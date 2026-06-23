import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--r-pill)] text-sm font-semibold tracking-[-.01em] transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[var(--sh-sm)] hover:shadow-[var(--sh-md)] hover:brightness-110",
        outline:
          "border border-[var(--border-mid)] bg-card text-ink hover:bg-secondary hover:text-secondary-foreground",
        ghost:
          "bg-transparent text-ink hover:bg-secondary",
        secondary:
          "bg-secondary text-secondary-foreground hover:brightness-[.97]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[13.5px]",
        default: "h-11 px-5",
        lg: "h-12 px-7 text-[15px]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
