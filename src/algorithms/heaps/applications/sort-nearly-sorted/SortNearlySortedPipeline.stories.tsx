/**
 * Storybook stories for the Sort Nearly Sorted algorithm pipeline.
 * Uses the real step generator with array [6,5,3,2,8,10,9] and k=3,
 * rendering the HeapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateSortNearlySortedSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/HeapVisualizer";

const steps = generateSortNearlySortedSteps({ array: [6, 5, 3, 2, 8, 10, 9], kValue: 3 });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Sort Nearly Sorted",
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

/** Initial state — min-heap seeded with first k+1 elements */
export const InitialHeap: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-sort — sliding window in progress with some elements placed into the result */
export const SlidingWindowInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Final state — heap fully drained, all elements sorted */
export const FinalSortedResult: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
