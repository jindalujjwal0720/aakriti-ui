/**
 * Button component
 * @use Highlight
 * @dependencies class-variance-authority, jiva:utils/cn
 */
import React from "react";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Highlight } from "./highlight";

export const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap transition-colors cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background"
  ),
  {
    variants: {
      kind: { primary: "", danger: "" },
      variant: {
        outline: "outline outline-border",
        filled: "outline-none",
        dashed: "outline outline-dashed outline-border",
        ghost: "outline-none",
        faint: "outline-none",
        link: "outline-none hover:underline",
      },
      size: {
        sm: "h-6 text-sm px-1.5 rounded",
        md: "h-8 text-sm px-3.5 rounded-md",
        lg: "h-10 text-base px-3.5 rounded-lg",
      },
      shape: { circle: "rounded-full", rect: "" },
    },
    compoundVariants: [
      // Primary variants
      {
        variant: "outline",
        kind: "primary",
        className: "text-foreground hover:text-primary hover:outline-primary",
      },
      {
        variant: "filled",
        kind: "primary",
        className: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      {
        variant: "dashed",
        kind: "primary",
        className: "text-foreground hover:text-primary hover:outline-primary",
      },
      {
        variant: "ghost",
        kind: "primary",
        className: "text-primary hover:bg-primary/10",
      },
      {
        variant: "faint",
        kind: "primary",
        className: "text-primary bg-primary/10 hover:bg-primary/15",
      },
      {
        variant: "link",
        kind: "primary",
        className: "text-primary",
      },
      // Danger variants
      {
        variant: "outline",
        kind: "danger",
        className: "text-foreground hover:text-danger hover:outline-danger",
      },
      {
        variant: "filled",
        kind: "danger",
        className: "bg-danger text-danger-foreground hover:bg-danger/90",
      },
      {
        variant: "dashed",
        kind: "danger",
        className: "text-foreground hover:text-danger hover:outline-danger",
      },
      {
        variant: "ghost",
        kind: "danger",
        className: "text-danger hover:bg-danger/10",
      },
      {
        variant: "faint",
        kind: "danger",
        className: "text-danger bg-danger/10 hover:bg-danger/15",
      },
      {
        variant: "link",
        kind: "danger",
        className: "text-danger",
      },
    ],
    defaultVariants: {
      kind: "primary",
      variant: "outline",
      size: "md",
      shape: "rect",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, kind, variant, size, shape, icon, ...props },
    ref
  ) => {
    return (
      <Highlight disabled={props.disabled}>
        <button
          ref={ref}
          {...props}
          className={cn(
            buttonVariants({ kind, variant, size, className }),
            shape === "circle" && "rounded-full",
            icon &&
              !children &&
              { sm: "w-6", md: "w-8", lg: "w-10" }[size || "md"]
          )}
        >
          {icon ? (
            icon
          ) : typeof children === "string" ? (
            <span>{children}</span>
          ) : (
            children
          )}
        </button>
      </Highlight>
    );
  }
);
Button.displayName = "Button";
