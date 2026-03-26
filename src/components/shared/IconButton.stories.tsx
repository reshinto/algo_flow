/** Storybook stories for the IconButton component. */
import type { Meta, StoryObj } from "@storybook/react";
import { FiPlay, FiPause, FiChevronRight } from "react-icons/fi";
import IconButton from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Shared/IconButton",
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Play: Story = {
  args: {
    label: "Play",
    children: <FiPlay size={16} />,
  },
};

export const Pause: Story = {
  args: {
    label: "Pause",
    children: <FiPause size={16} />,
  },
};

export const Small: Story = {
  args: {
    label: "Step forward",
    size: "sm",
    children: <FiChevronRight size={14} />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
    children: <FiPlay size={16} />,
  },
};
