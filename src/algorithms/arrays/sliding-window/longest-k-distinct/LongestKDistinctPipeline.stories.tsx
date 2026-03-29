/**
 * Storybook stories for the Longest K-Distinct Subarray algorithm pipeline.
 * Renders the ArrayVisualizer at key states — initialization, window expansion,
 * shrink phase when distinct count exceeds K, and final completion.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateLongestKDistinctSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateLongestKDistinctSteps({
  inputArray: [1, 2, 1, 2, 3, 3, 4, 1],
  maxDistinct: 2,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Longest K-Distinct Subarray",
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

/** Initial state — array before window processing begins */
export const Initialized: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Expanding — right pointer moving with fewer than K distinct elements */
export const Expanding: Story = {
  args: {
    visualState: steps[Math.min(3, steps.length - 1)]!.visualState as ArrayVisualState,
  },
};

/** Shrinking — left pointer advancing after distinct count exceeded K */
export const Shrinking: Story = {
  args: {
    visualState: (() => {
      const shrinkStep = steps.find((step) => step.type === "shrink-window");
      return (shrinkStep ?? steps[Math.floor(steps.length / 2)]!).visualState as ArrayVisualState;
    })(),
  },
};

/** Final state — longest valid subarray identified */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
