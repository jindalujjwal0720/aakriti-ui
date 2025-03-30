import type { Meta, StoryObj } from "@storybook/react";

import {
  Collapse,
  CollapseItem,
  CollapseTrigger,
  CollapseContent,
} from "@/components/collapse";

const meta: Meta<typeof Collapse> = {
  title: "Components/Collapse",
  component: Collapse,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    mode: {
      description: "Mode of the collapse component",
      options: ["accordion", "multiple"],
      control: { type: "radio" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Collapse>;

export const Default: Story = {
  args: {
    mode: "multiple",
  },
  render: (args) => (
    <Collapse {...args}>
      <CollapseItem>
        <CollapseTrigger>Item 1</CollapseTrigger>
        <CollapseContent>
          A dog is a type of domesticated animal. Known for its loyalty and
          faithfulness, it can be found as a welcome guest in many households
          across the world.
        </CollapseContent>
      </CollapseItem>
      <CollapseItem>
        <CollapseTrigger>Item 2</CollapseTrigger>
        <CollapseContent>Content 2</CollapseContent>
      </CollapseItem>
      <CollapseItem>
        <CollapseTrigger>Item 3</CollapseTrigger>
        <CollapseContent>Content 3</CollapseContent>
      </CollapseItem>
    </Collapse>
  ),
};

export const Accordion: Story = {
  args: {
    mode: "accordion",
  },
  render: (args) => (
    <Collapse {...args}>
      <CollapseItem>
        <CollapseTrigger>Item 1</CollapseTrigger>
        <CollapseContent>Content 1</CollapseContent>
      </CollapseItem>
      <CollapseItem>
        <CollapseTrigger>Item 2</CollapseTrigger>
        <CollapseContent>Content 2</CollapseContent>
      </CollapseItem>
      <CollapseItem>
        <CollapseTrigger>Item 3</CollapseTrigger>
        <CollapseContent>Content 3</CollapseContent>
      </CollapseItem>
    </Collapse>
  ),
};

export const Nested: Story = {
  args: {
    mode: "multiple",
  },
  render: (args) => (
    <Collapse {...args}>
      <CollapseItem>
        <CollapseTrigger>Item 1</CollapseTrigger>
        <CollapseContent>
          <Collapse mode="accordion">
            <CollapseItem>
              <CollapseTrigger>Nested Item 1</CollapseTrigger>
              <CollapseContent>Nested Content 1</CollapseContent>
            </CollapseItem>
            <CollapseItem>
              <CollapseTrigger>Nested Item 2</CollapseTrigger>
              <CollapseContent>Nested Content 2</CollapseContent>
            </CollapseItem>
          </Collapse>
        </CollapseContent>
      </CollapseItem>
      <CollapseItem>
        <CollapseTrigger>Item 2</CollapseTrigger>
        <CollapseContent>Content 2</CollapseContent>
      </CollapseItem>
    </Collapse>
  ),
};
