/**
 * Storybook stories for the Minimum in Rotated Sorted Array algorithm pipeline.
 * Uses the real step generator with a rotated array, rendering ArrayVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateMinRotatedArraySteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateMinRotatedArraySteps({
  sortedArray: [4, 5, 6, 7, 0, 1, 2],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Min Rotated Array",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state showing the full rotated array before search begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-search with some elements eliminated */
export const MidSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Minimum element found — highlighted as found */
export const MinimumFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
