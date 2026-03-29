/**
 * Storybook stories for the Sliding Window algorithm pipeline.
 * Uses the real step generator with a 10-element array and window size 3,
 * rendering the ArrayVisualizer at key sliding states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateSlidingWindowSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateSlidingWindowSteps({
  inputArray: [2, 1, 5, 1, 3, 2, 8, 4, 3, 5],
  windowSize: 3,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Sliding Window",
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

/** Initial window positioned at the first 3 elements */
export const InitialWindow: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Window sliding through the middle of the array */
export const MidSlide: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — best window identified at maximum sum position */
export const BestWindowFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
