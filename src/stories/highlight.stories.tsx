import type { Meta, StoryObj } from "@storybook/react";

import { Highlight, HighlightProps } from "@/components/highlight";
import React from "react";
import { InsetHighlightEffect, ShakeHighlightEffect } from "./utils/highlight";
import { cn } from "@/utils/cn";

const DummyComponent = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "bg-primary text-primary-foreground px-2 cursor-pointer",
      className
    )}
    {...props}
  >
    Click me to see the highlight effect!
  </button>
));
DummyComponent.displayName = "DummyComponent";

const meta: Meta<typeof Highlight> = {
  title: "Utils/Highlight",
  component: Highlight,
  render: (props: HighlightProps) => (
    <Highlight {...props}>
      <DummyComponent />
    </Highlight>
  ),
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    children: {
      description: "The element to apply the highlight effect to",
    },
    disabled: {
      description: "Whether the highlight effect should be disabled",
      table: { defaultValue: { summary: "false" } },
    },
    effect: {
      description: "The highlight effect to apply",
      control: { disable: true },
      type: "function",
    },
  },
  args: {
    disabled: false,
    effect: undefined,
  },
};

export default meta;

type Story = StoryObj<typeof Highlight>;

export const Default: Story = {
  args: {
    disabled: false,
    effect: undefined,
  },
};

export const Shake: Story = {
  args: {
    disabled: false,
    effect: ShakeHighlightEffect,
  },
};

export const Inset: Story = {
  args: {
    disabled: false,
    effect: InsetHighlightEffect,
  },
};
