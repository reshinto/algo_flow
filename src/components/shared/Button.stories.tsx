import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Play",
    variant: "primary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Step Forward",
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    children: "0.5x",
    variant: "ghost",
    size: "sm",
  },
};
