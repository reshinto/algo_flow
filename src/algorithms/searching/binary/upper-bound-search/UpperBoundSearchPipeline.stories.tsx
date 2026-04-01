/**
 * Storybook stories for the Upper Bound Search algorithm pipeline.
 * Uses the real step generator with a sorted array and target value,
 * rendering the ArrayVisualizer at key search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateUpperBoundSearchSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateUpperBoundSearchSteps({
  sortedArray: [1, 3, 3, 5, 5, 5, 8, 12],
  targetValue: 5,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Upper Bound Search",
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

/** Initial state with full search range */
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

/** Upper bound identified — first element strictly greater than target highlighted */
export const UpperBoundFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
