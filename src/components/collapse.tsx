import React from "react";
import {
  Collapse as HeadlessCollapse,
  CollapseItem as HeadlessCollapseItem,
  CollapseTrigger as HeadlessCollapseTrigger,
  CollapseContent as HeadlessCollapseContent,
  type CollapseProps,
  type CollapseItemProps,
  useCollapseItem,
} from "./headless/collapse";
import { cn } from "@/utils/cn";

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  ({ className, ...props }, ref) => {
    return (
      <HeadlessCollapse
        ref={ref}
        {...props}
        className={cn("divide-y divide-border", className)}
      />
    );
  }
);
Collapse.displayName = "Collapse";

export const CollapseItem = React.forwardRef<HTMLDivElement, CollapseItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <HeadlessCollapseItem
        ref={ref}
        {...props}
        className={cn(
          "first:rounded-t-md last:rounded-b-md",
          "border-border border-x first:border-t last:border-b",
          "divide-border divide-y",
          className
        )}
      />
    );
  }
);
CollapseItem.displayName = "CollapseItem";

export const CollapseTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof HeadlessCollapseTrigger>
>(({ className, ...props }, ref) => {
  return (
    <HeadlessCollapseTrigger
      ref={ref}
      {...props}
      className={cn(
        "flex items-center justify-between w-full",
        "px-4 py-3 text-sm",
        "bg-muted/50 hover:bg-muted/80",
        "cursor-pointer",
        className
      )}
    />
  );
});
CollapseTrigger.displayName = "CollapseTrigger";

export const CollapseContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof HeadlessCollapseContent>
>(({ className, children, ...props }, ref) => {
  "use client";
  const { isOpen } = useCollapseItem();
  const [isRendered, setIsRendered] = React.useState(isOpen);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [forceUpdate, setForceUpdate] = React.useState(0);

  React.useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!contentRef.current || !isOpen) return;

    const resizeObserver = new ResizeObserver(() => {
      setForceUpdate((prev) => prev + 1);
    });
    resizeObserver.observe(contentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isOpen, isRendered]);

  if (!isOpen && !isRendered) return null;

  const currentHeight =
    isOpen && contentRef.current ? contentRef.current.scrollHeight : 0;

  return (
    <div
      style={{
        overflow: "hidden",
        height: isOpen ? `${currentHeight}px` : "0px",
        transition: "height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "height",
      }}
    >
      <div ref={contentRef} data-force-update={forceUpdate}>
        <HeadlessCollapseContent
          ref={ref}
          {...props}
          className={cn("p-4 text-sm leading-normal", className)}
        >
          {children}
        </HeadlessCollapseContent>
      </div>
    </div>
  );
});
CollapseContent.displayName = "CollapseContent";
