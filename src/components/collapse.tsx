import React from "react";
import {
  Collapse as HeadlessCollapse,
  CollapseItem as HeadlessCollapseItem,
  CollapseTrigger as HeadlessCollapseTrigger,
  CollapseContent as HeadlessCollapseContent,
  type CollapseProps as HeadlessCollapseProps,
  type CollapseItemProps as HeadlessCollapseItemProps,
  useCollapseItem as useHeadlessCollapseItem,
} from "./headless/collapse";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

type CollapseSize = "sm" | "md" | "lg";

type CollapseProps = Omit<HeadlessCollapseProps, "size"> & {
  size?: CollapseSize;
};

interface CollapseContextValue {
  size?: CollapseSize;
}

const CollapseContext = React.createContext<CollapseContextValue | null>(null);

const useCollapse = () => {
  const context = React.useContext(CollapseContext);
  if (!context) {
    throw new Error("useCollapse must be used within a Collapse");
  }
  return context;
};

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  ({ className, size = "md", ...props }, ref) => {
    const contextValue = React.useMemo(() => ({ size }), [size]);

    return (
      <CollapseContext.Provider value={contextValue}>
        <HeadlessCollapse
          ref={ref}
          {...props}
          className={cn("divide-y divide-border", className)}
        />
      </CollapseContext.Provider>
    );
  }
);
Collapse.displayName = "Collapse";

type CollapseItemProps = Omit<HeadlessCollapseItemProps, "size"> & {
  size?: CollapseSize;
};

interface CollapseItemContextValue {
  size?: CollapseSize;
}

const CollapseItemContext =
  React.createContext<CollapseItemContextValue | null>(null);

const useCollapseItem = () => {
  const context = React.useContext(CollapseItemContext);
  if (!context) {
    throw new Error("useCollapseItem must be used within a CollapseItem");
  }
  return context;
};

export const CollapseItem = React.forwardRef<HTMLDivElement, CollapseItemProps>(
  ({ className, size, ...props }, ref) => {
    const contextValue = React.useMemo(() => ({ size }), [size]);
    return (
      <CollapseItemContext.Provider value={contextValue}>
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
      </CollapseItemContext.Provider>
    );
  }
);
CollapseItem.displayName = "CollapseItem";

const collapseTriggerVariants = cva(
  cn(
    "flex items-center justify-between w-full",
    "bg-muted/50 hover:bg-muted/80",
    "cursor-pointer"
  ),
  {
    variants: {
      size: {
        sm: "px-2.5 py-1.5 text-sm",
        md: "px-4 py-3 text-sm",
        lg: "px-4 py-3.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const CollapseTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof HeadlessCollapseTrigger>
>(({ className, ...props }, ref) => {
  const { size: defaultSize } = useCollapse();
  const { size } = useCollapseItem();
  const computedSize = size || defaultSize;
  console.log("computedSize", computedSize);

  return (
    <HeadlessCollapseTrigger
      ref={ref}
      {...props}
      className={cn(collapseTriggerVariants({ size: computedSize }), className)}
    />
  );
});
CollapseTrigger.displayName = "CollapseTrigger";

export const CollapseContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof HeadlessCollapseContent>
>(({ className, children, ...props }, ref) => {
  "use client";
  const { isOpen } = useHeadlessCollapseItem();
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
