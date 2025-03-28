import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/button";
import { Power } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    children: {
      description: "The content of the button",
      control: { disable: true },
    },
    kind: {
      description: "The kind of the button",
      table: { defaultValue: { summary: "primary" } },
      options: ["primary", "danger"],
      control: { type: "radio" },
    },
    variant: {
      description: "The variant of the button",
      table: { defaultValue: { summary: "outline" } },
      options: ["outline", "filled", "dashed", "ghost", "faint", "link"],
      control: { type: "radio" },
    },
    size: {
      description: "The size of the button",
      table: { defaultValue: { summary: "md" } },
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    shape: {
      description: "The shape of the button",
      table: { defaultValue: { summary: "rect" } },
      options: ["circle", "rect"],
      control: { type: "radio" },
    },
    icon: {
      description: "In case of an icon button, the icon to display",
      control: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

const defaults = {
  kind: "primary",
  variant: "outline",
  size: "md",
  shape: "rect",
} as const;

export const Outline: Story = {
  args: {
    ...defaults,
    children: "Outline Button",
  },
};

export const Filled: Story = {
  args: {
    ...defaults,
    children: "Filled Button",
    variant: "filled",
  },
};

export const Dashed: Story = {
  args: {
    ...defaults,
    children: "Dashed Button",
    variant: "dashed",
  },
};

export const Ghost: Story = {
  args: {
    ...defaults,
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Faint: Story = {
  args: {
    ...defaults,
    children: "Faint Button",
    variant: "faint",
  },
};

export const Link: Story = {
  args: {
    ...defaults,
    children: "Link Button",
    variant: "link",
  },
};

export const IconButton: Story = {
  args: {
    ...defaults,
    icon: <Power size={16} />,
  },
};

export const WithIcon: Story = {
  args: {
    ...defaults,
    children: (
      <div className="flex items-center gap-2">
        <Power size={16} />
        <span>Power</span>
      </div>
    ),
  },
};

export const DisabledButton: Story = {
  args: {
    ...defaults,
    children: "Disabled Button",
    disabled: true,
  },
};
