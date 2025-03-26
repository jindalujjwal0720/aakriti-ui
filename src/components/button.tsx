import { cn } from "@/utils/cn";
import React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={cn("px-4 py-2 bg-blue-500 text-white rounded-md", className)}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

export { Button };
