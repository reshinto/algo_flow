/**
 * Storybook stories for the Merge Two Sorted Arrays algorithm pipeline.
 * Uses the real step generator with two sorted arrays, rendering the
 * ArrayVisualizer at key merge states including the secondary merged result array.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateMergeSortedArraysSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateMergeSortedArraysSteps({
  firstArray: [1, 3, 5, 7, 9],
  secondArray: [2, 4, 6, 8, 10],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Merge Sorted Arrays",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — both input arrays ready, merged result empty */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-merge — pointers comparing elements from both arrays */
export const MidMerge: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — merged result fully populated in sorted order */
export const MergeComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
