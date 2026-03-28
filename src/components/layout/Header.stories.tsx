/**
 * Storybook stories for the Header component.
 *
 * Header reads from the Zustand store (selectedId, selectAlgorithm, reset,
 * toggleEducationalDrawer) and the algorithm registry to build the selector
 * options. It renders correctly when algorithms are registered in the registry.
 */
import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--color-surface-primary)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

/** Default header — renders with whatever algorithms are currently registered. */
export const Default: Story = {};
