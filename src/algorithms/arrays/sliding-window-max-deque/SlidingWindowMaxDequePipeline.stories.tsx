/**
 * Storybook stories for the Sliding Window Maximum (Deque) algorithm pipeline.
 * Uses the real step generator with the default 8-element array and window size 3,
 * rendering the ArrayVisualizer at key deque execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateSlidingWindowMaxDequeSteps } from "@/algorithms/arrays/sliding-window-max-deque/step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateSlidingWindowMaxDequeSteps({
  inputArray: [1, 3, -1, -3, 5, 3, 6, 7],
  windowSize: 3,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Sliding Window Max Deque",
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

/** Initial state — deque empty, processing first element */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — window sliding through the array, deque maintaining max */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all window maxima computed */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
