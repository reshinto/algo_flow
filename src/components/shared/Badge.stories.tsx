import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Shared/Badge",
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "compare" },
};

export const Emerald: Story = {
  args: { children: "O(n log n)", variant: "emerald" },
};

export const Cyan: Story = {
  args: { children: "initialize", variant: "cyan" },
};

export const Amber: Story = {
  args: { children: "swap", variant: "amber" },
};

export const Rose: Story = {
  args: { children: "O(n²)", variant: "rose" },
};
