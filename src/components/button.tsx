import React from "react";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Highlight } from "./highlight";

const buttonVariants = cva(
  cn(
    "font-normal cursor-pointer inline-flex items-center focus:animate-focus justify-center gap-2 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background"
  ),
  {
    variants: {
      variant: {
        default:
          "text-foreground outline outline-border hover:text-primary hover:outline-primary",
        primary:
          "outline-none bg-primary text-primary-foreground hover:bg-primary/90",
        dashed:
          "outline outline-dashed outline-border text-foreground hover:text-primary hover:outline-primary",
        text: "outline-none text-foreground hover:bg-muted",
      },
      size: {
        sm: "text-sm px-1.5 py-0.5 rounded",
        md: "text-sm px-3.5 py-1.5 rounded-md",
        lg: "text-base px-3.5 py-2 rounded-lg",
      },
      shape: {
        circle: "rounded-full",
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "default",
      size = "md",
      shape = "default",
      ...props
    },
    ref
  ) => {
    return (
      <Highlight disabled={props.disabled}>
        <button
          ref={ref}
          {...props}
          className={cn(buttonVariants({ variant, size, shape, className }))}
        >
          <span>{children}</span>
        </button>
      </Highlight>
    );
  }
);
Button.displayName = "Button";
