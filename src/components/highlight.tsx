import React from "react";
import { renderToPortal } from "./utils/portal";

export interface HighlightEffectProps {
  target: HTMLElement;
  cleanup: () => void;
  event: MouseEvent;
}

export interface HighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  disabled?: boolean;
  effect?: React.FC<HighlightEffectProps>;
}

const isAllowedElement = (
  element: React.ReactNode
): element is React.ReactElement<Record<string, unknown>> =>
  React.isValidElement(element) &&
  (element.type as React.ComponentType).displayName !== "Highlight";

function extractBackgroundColor(computedStyle: CSSStyleDeclaration): string {
  const rawColor = computedStyle.backgroundColor?.trim() || "var(--primary)";

  const isTransparentOrWhite = (color: string): boolean => {
    const transparentPatterns = [
      "transparent",
      "rgba(0, 0, 0, 0)",
      "rgb(255, 255, 255)",
      "rgba(255, 255, 255, 1)",
      "white",
    ];

    // Regex to match various white/transparent representations
    const transparentRegex =
      /^rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(,\s*(0|1|0?\.\d+))?\)$/;

    return (
      !color ||
      transparentPatterns.includes(color.toLowerCase()) ||
      transparentRegex.test(color)
    );
  };

  return isTransparentOrWhite(rawColor) ? "var(--primary)" : rawColor;
}

export const DefaultHighlightEffect: React.FC<HighlightEffectProps> = ({
  target,
  cleanup,
}) => {
  const highlightRef = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({
    backgroundColor: "transparent",
    width: 0,
    height: 0,
    borderRadius: "0px",
    opacity: 0.2,
    boxShadow: "none",
  });

  const updateHighlightPosition = React.useCallback(() => {
    if (!target) return;

    const computedStyle = window.getComputedStyle(target);

    return {
      width: target.offsetWidth,
      height: target.offsetHeight,
      backgroundColor: extractBackgroundColor(computedStyle),
      borderRadius: [
        computedStyle.borderTopLeftRadius,
        computedStyle.borderTopRightRadius,
        computedStyle.borderBottomRightRadius,
        computedStyle.borderBottomLeftRadius,
      ].join(" "),
    };
  }, [target]);

  React.useEffect(() => {
    if (!target) {
      cleanup();
      return;
    }

    const positionTimeout = setTimeout(() => {
      const newStyle = updateHighlightPosition();
      if (newStyle) {
        setStyle((prevStyle) => ({
          ...prevStyle,
          ...newStyle,
          opacity: 0,
          backgroundColor: "transparent",
          boxShadow: `0 0 0 6px ${newStyle.backgroundColor}`,
          transition: `box-shadow 400ms var(--ease-in-out-circ), opacity 2000ms var(--ease-in-out-circ)`,
        }));
      }
    }, 50);

    const resizeObserver = new ResizeObserver(() => {
      const newStyle = updateHighlightPosition();
      if (newStyle) {
        setStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
      }
    });

    return () => {
      clearTimeout(positionTimeout);
      resizeObserver.disconnect();
    };
  }, [target, updateHighlightPosition, cleanup]);

  React.useEffect(() => {
    const highlightElement = highlightRef.current;
    if (!highlightElement) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === "opacity") {
        cleanup();
      }
    };

    highlightElement.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      highlightElement.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );
    };
  }, [cleanup]);

  return (
    <div
      ref={highlightRef}
      style={style}
      className="absolute -z-[1] left-0 top-0 bg-transparent pointer-events-none box-border shadow-none"
    />
  );
};

const showHighlightEffect = (
  target: HTMLElement,
  Component = DefaultHighlightEffect,
  event: MouseEvent
) => {
  if (!target) return;

  target?.classList.add("relative");
  // create the holder element
  const holder = document.createElement("div");
  holder.style.position = "absolute";
  holder.style.left = "0px";
  holder.style.top = "0px";
  holder.style.pointerEvents = "none";
  target.prepend(holder);

  const removeHolder = () => {
    // holder.remove();
  };

  renderToPortal(
    <Component target={target} cleanup={removeHolder} event={event} />,
    holder // render to the target element
  );
};

export const Highlight = ({
  children,
  disabled,
  effect: EffectComponent = DefaultHighlightEffect,
}: HighlightProps) => {
  const childNodeRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const targetElement = childNodeRef.current;
    if (disabled || !targetElement) return;

    const handleHighlightClick = (e: MouseEvent) => {
      showHighlightEffect(targetElement, EffectComponent, e);
    };

    targetElement.addEventListener("click", handleHighlightClick);
    return () => {
      targetElement.removeEventListener("click", handleHighlightClick);
    };
  }, [EffectComponent, disabled]);

  return !disabled && isAllowedElement(children)
    ? React.cloneElement(children, { ref: childNodeRef })
    : children;
};
Highlight.displayName = "Highlight";
