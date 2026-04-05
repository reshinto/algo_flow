/**
 * Storybook stories for the Sliding Window Maximum algorithm pipeline.
 * Uses the real step generator with [1, 3, -1, -3, 5, 3, 6, 7] k=3, rendering
 * the StackQueueVisualizer at key deque operation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateSlidingWindowMaximumSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/StackQueueVisualizer";

const defaultSteps = generateSlidingWindowMaximumSteps({
  nums: [1, 3, -1, -3, 5, 3, 6, 7],
  windowSize: 3,
});

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Sliding Window Maximum",
  component: StackQueueVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StackQueueVisualizer>;

/** Initial state — full input array unprocessed, empty deque */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing with deque partially filled */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed — all windows processed, result array populated */
export const AllWindowsComplete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
