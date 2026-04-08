/**
 * Storybook stories for the Binary Search algorithm pipeline.
 * Uses the real step generator with a sorted array and target value,
 * rendering the ArrayVisualizer at key search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateBinarySearchSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateBinarySearchSteps({
  sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
  targetValue: 23,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Binary Search",
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

/** Initial state with full search range and mid pointer */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-search with some elements eliminated from the range */
export const MidSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Target found — element highlighted as found */
export const TargetFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
