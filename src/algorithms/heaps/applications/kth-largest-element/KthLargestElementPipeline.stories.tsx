/**
 * Storybook stories for the Kth Largest Element algorithm pipeline.
 * Uses the real step generator with an 8-element array and k = 3,
 * rendering the HeapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateKthLargestElementSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/HeapVisualizer";

const steps = generateKthLargestElementSteps({ array: [3, 1, 5, 12, 2, 11, 7, 9], kValue: 3 });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Kth Largest Element",
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

/** Initial state — empty min-heap before processing begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-processing — min-heap of size k being maintained */
export const HeapBuilding: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Final state — root of the min-heap is the kth largest element */
export const ResultHighlighted: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
