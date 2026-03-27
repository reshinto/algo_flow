/**
 * Storybook stories for the Build Min Heap algorithm pipeline.
 * Uses the real step generator with a 9-element array,
 * rendering the HeapVisualizer at key heapify states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateBuildMinHeapSteps } from "@/algorithms/heaps/build-min-heap/step-generator";
import HeapVisualizer from "./HeapVisualizer";

const steps = generateBuildMinHeapSteps({ array: [9, 5, 7, 1, 3, 8, 2, 6, 4] });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Build Min Heap",
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

/** Initial state — unsorted array before heapify begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-heapify with some nodes settled and a comparison in progress */
export const MidHeapify: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed heap — all nodes satisfy the min-heap property */
export const HeapComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
