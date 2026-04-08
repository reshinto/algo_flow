/**
 * Storybook stories for the Merge K Sorted Arrays algorithm pipeline.
 * Uses the real step generator with 3 sorted arrays of 3 elements each,
 * rendering the HeapVisualizer at key states during the merge process.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateMergeKSortedArraysSteps } from "../step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateMergeKSortedArraysSteps({
  arrays: [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ],
});

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Merge K Sorted Arrays",
  component: HeapVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeapVisualizer>;

/** Initial state — min-heap initialized with the first element of each array */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-merge — heap partially consumed with some elements extracted and replaced */
export const MergeInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed — all elements extracted and heap is empty */
export const MergeComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
