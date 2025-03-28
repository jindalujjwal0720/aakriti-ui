import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    children: {
      description: "The content of the button",
    },
    variant: {
      description: "The variant of the button",
      table: { defaultValue: { summary: "default" } },
      options: ["default", "primary", "dashed", "text"],
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
      table: { defaultValue: { summary: "default" } },
      options: ["circle", "default"],
      control: { type: "radio" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Default Button",
    variant: "default",
    size: "md",
    shape: "default",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "md",
    shape: "default",
  },
};

export const Dashed: Story = {
  args: {
    children: "Dashed Button",
    variant: "dashed",
    size: "md",
    shape: "default",
  },
};

export const Text: Story = {
  args: {
    children: "Text Button",
    variant: "text",
    size: "md",
    shape: "default",
  },
};
