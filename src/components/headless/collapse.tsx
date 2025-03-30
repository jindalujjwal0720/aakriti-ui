"use client";
import React from "react";

export interface CollapseProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactElement<CollapseItemProps>[];
  mode?: "accordion" | "multiple";
}

interface CollapseContextValue {
  toggleItem: (tag: string) => void;
  isItemExpanded: (tag: string) => boolean;
}

const CollapseContext = React.createContext<CollapseContextValue | undefined>(
  undefined
);

const useCollapse = () => {
  const context = React.useContext(CollapseContext);
  if (!context) {
    throw new Error("useCollapse must be used within a Collapse");
  }
  return context;
};

const generateChildTag = (tag: string | null | undefined, index: number) => {
  return typeof tag === "string" ? tag : `jv-item-${index}`;
};

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  ({ children, mode = "multiple", ...props }, ref) => {
    const [expandedTags, setExpandedTags] = React.useState<string[]>([]);

    const toggleItem = React.useCallback(
      (key: string) => {
        setExpandedTags((prev) => {
          if (mode === "accordion") {
            return prev.includes(key) ? [] : [key];
          }
          if (prev.includes(key)) {
            return prev.filter((item) => item !== key);
          }
          return [...prev, key];
        });
      },
      [mode]
    );

    const isItemExpanded = React.useCallback(
      (key: string) => expandedTags.includes(key),
      [expandedTags]
    );

    const contextValue = React.useMemo(
      () => ({
        toggleItem,
        isItemExpanded,
      }),
      [isItemExpanded, toggleItem]
    );

    return (
      <CollapseContext.Provider value={contextValue}>
        <div ref={ref} {...props}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement<HTMLDivElement>(child)) {
              return React.cloneElement(
                child as React.ReactElement<CollapseItemProps>,
                {
                  tag: generateChildTag(
                    (child.props as CollapseItemProps).tag,
                    index
                  ),
                }
              );
            }
            return child;
          })}
        </div>
      </CollapseContext.Provider>
    );
  }
);
Collapse.displayName = "Collapse";

export interface CollapseItemContextValue {
  isOpen: boolean;
  toggleOpen: () => void;
}

const CollapseItemContext = React.createContext<
  CollapseItemContextValue | undefined
>(undefined);

export const useCollapseItem = () => {
  const context = React.useContext(CollapseItemContext);
  if (!context) {
    throw new Error("useCollapseItem must be used within a CollapseItem");
  }
  return context;
};

export interface CollapseItemProps extends React.HTMLProps<HTMLDivElement> {
  tag?: string;
}

export const CollapseItem = React.forwardRef<HTMLDivElement, CollapseItemProps>(
  ({ children, key, tag, ...props }, ref) => {
    const { toggleItem: toggleKey, isItemExpanded } = useCollapse();

    const contextValue = React.useMemo(() => {
      if (!tag) {
        throw new Error("tag is required for CollapseItem");
      }
      return {
        isOpen: isItemExpanded(tag),
        toggleOpen: () => toggleKey(tag),
      };
    }, [isItemExpanded, tag, toggleKey]);

    return (
      <CollapseItemContext.Provider key={key} value={contextValue}>
        <div key={key} ref={ref} {...props}>
          {children}
        </div>
      </CollapseItemContext.Provider>
    );
  }
);
CollapseItem.displayName = "CollapseItem";

export const CollapseTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, onClick, ...props }, ref) => {
  const { toggleOpen } = useCollapseItem();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    toggleOpen();
  };

  return (
    <button ref={ref} {...props} onClick={handleClick}>
      {children}
    </button>
  );
});
CollapseTrigger.displayName = "CollapseTrigger";

export const CollapseContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const { isOpen } = useCollapseItem();

  if (!isOpen) return null;

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});
CollapseContent.displayName = "CollapseContent";
