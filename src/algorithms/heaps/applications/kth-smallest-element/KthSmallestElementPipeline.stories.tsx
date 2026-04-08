/**
 * Storybook stories for the Kth Smallest Element algorithm pipeline.
 * Uses the real step generator with a 7-element array and k = 3,
 * rendering the HeapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateKthSmallestElementSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateKthSmallestElementSteps({ array: [7, 10, 4, 3, 20, 15, 8], kValue: 3 });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Kth Smallest Element",
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

/** Initial state — empty max-heap before processing begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-processing — max-heap of size k being maintained */
export const HeapBuilding: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Final state — root of the max-heap is the kth smallest element */
export const ResultHighlighted: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
