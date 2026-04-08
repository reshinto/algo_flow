/**
 * Storybook stories for the Top-K Frequent Elements (Heap) algorithm pipeline.
 * Uses the real step generator with a 10-element input and k=2,
 * rendering the HeapVisualizer at key states during heap construction.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateTopKFrequentHeapSteps } from "../step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateTopKFrequentHeapSteps({
  array: [1, 1, 1, 2, 2, 3, 3, 3, 3, 4],
  kValue: 2,
});

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Top-K Frequent Heap",
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

/** Initial state — before any elements are inserted into the heap */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-construction — heap partially built with some elements inserted and compared */
export const HeapBuilding: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed — min-heap of size k contains the 2 most frequent elements */
export const TopKComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
