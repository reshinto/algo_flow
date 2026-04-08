/**
 * Storybook stories for the Sum of Subarray Minimums algorithm pipeline.
 * Uses the real step generator with [3, 1, 2, 4], rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateSumOfSubarrayMinimumsSteps } from "../step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateSumOfSubarrayMinimumsSteps({ arr: [3, 1, 2, 4] });
const duplicateSteps = generateSumOfSubarrayMinimumsSteps({ arr: [2, 2, 2] });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Sum of Subarray Minimums",
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

/** Initial state — full input array unprocessed, empty stack */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid left-boundary pass — some elements processed, stack building up */
export const LeftBoundaryPass: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 4)]!
      .visualState as StackQueueVisualState,
  },
};

/** Mid right-boundary pass — second pass traversing right to left */
export const RightBoundaryPass: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed — all contributions summed, result = 17 */
export const Complete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Duplicate elements — array [2, 2, 2] demonstrating asymmetric pop conditions */
export const DuplicateElements: Story = {
  args: {
    visualState: duplicateSteps[duplicateSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
