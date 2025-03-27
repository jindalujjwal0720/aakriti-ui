import { HighlightEffectProps } from "@/components/highlight";
import React from "react";

export const ShakeHighlightEffect: React.FC<HighlightEffectProps> = ({
  target,
  cleanup: onRemove,
}) => {
  const shakeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!target) {
      onRemove();
      return;
    }

    const seq = [0, -15, 15, -5, 5, 0];
    const itv = 10;
    let steps = 0;
    let effectTimeout: number;

    function loop() {
      // Cancel any existing animation frame
      cancelAnimationFrame(effectTimeout);

      effectTimeout = requestAnimationFrame(() => {
        const currentStep = Math.floor(steps / itv);
        const current = seq[currentStep];
        const next = seq[currentStep + 1];

        if (!next) {
          target.style.transform = "";
          target.style.transition = "";
          onRemove();
          return;
        }

        // Interpolate between current and next positions
        const angle = current + ((next - current) / itv) * (steps % itv);
        target.style.transform = `rotate(${angle}deg)`;
        target.style.transition = "none";

        steps += 1;
        loop();
      });
    }

    // Start the shake effect
    loop();

    // Cleanup function
    return () => {
      cancelAnimationFrame(effectTimeout);
      target.style.transform = "";
      target.style.transition = "";
    };
  }, [target, onRemove]);

  // Render an empty div to maintain the component structure
  return (
    <div
      ref={shakeRef}
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        opacity: 0,
      }}
    />
  );
};

export const InsetHighlightEffect: React.FC<HighlightEffectProps> = ({
  target,
  cleanup: onRemove,
  event,
}) => {
  const effectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!target) {
      onRemove();
      return;
    }

    // Create a holder div
    const holder = document.createElement("div");
    holder.style.position = "absolute";
    holder.style.left = "0";
    holder.style.top = "0";
    holder.style.width = "100%";
    holder.style.height = "100%";
    holder.style.overflow = "hidden";
    holder.style.pointerEvents = "none";
    target.appendChild(holder);

    // Calculate click position relative to the holder
    const rect = holder.getBoundingClientRect();
    const left = event.clientX - rect.left;
    const top = event.clientY - rect.top;

    const computedStyle = getComputedStyle(target);

    // Create dot
    const dot = document.createElement("div");
    dot.style.position = "absolute";
    dot.style.left = `${left}px`;
    dot.style.top = `${top}px`;
    dot.style.width = "0px";
    dot.style.height = "0px";
    dot.style.borderRadius = "50%";
    dot.style.backgroundColor = computedStyle.color;
    dot.style.transform = "translate(-50%, -50%)";
    dot.style.transition = "width 1s ease, height 1s ease, opacity 1s ease";
    dot.style.opacity = "0.8";

    holder.appendChild(dot);

    // Animate dot
    const animationFrame = requestAnimationFrame(() => {
      dot.ontransitionend = () => {
        holder.remove();
        onRemove();
      };

      dot.style.width = "200px";
      dot.style.height = "200px";
      dot.style.opacity = "0";
    });

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      if (target.contains(holder)) {
        target.removeChild(holder);
      }
    };
  }, [target, event, onRemove]);

  // Render an empty div to maintain component structure
  return (
    <div
      ref={effectRef}
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        opacity: 0,
      }}
    />
  );
};
