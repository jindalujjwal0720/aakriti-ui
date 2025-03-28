import React from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";

export interface PortalProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  target?: HTMLElement;
}

export const Portal: React.FC<PortalProps> = ({
  children,
  target = document.body,
}) => {
  const portalContainer = React.useMemo(() => {
    if (target !== document.body) return target;
    return document.createElement("div");
  }, [target]);

  React.useEffect(() => {
    if (target !== document.body) return;
    document.body.appendChild(portalContainer);

    return () => {
      // Only remove if it's still in the DOM
      if (portalContainer.parentNode) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [target, portalContainer]);

  return children ? ReactDOM.createPortal(children, portalContainer) : null;
};

export const renderToPortal = (
  element: React.ReactNode,
  target?: HTMLElement
) => {
  const targetElement = target || document.body;
  const root = ReactDOMClient.createRoot(targetElement);
  root.render(<Portal target={targetElement}>{element}</Portal>);
};
