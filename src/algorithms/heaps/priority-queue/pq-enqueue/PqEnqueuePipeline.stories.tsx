/**
 * Storybook stories for the PQ Enqueue algorithm pipeline.
 * Uses the real step generator with a 5-element min-heap and value 3,
 * rendering the HeapVisualizer at key enqueue states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generatePqEnqueueSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generatePqEnqueueSteps({ array: [2, 5, 8, 10, 15], value: 3 });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/PQ Enqueue",
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

/** Initial state — priority queue before new element is enqueued */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-enqueue — new element appended and sift-up in progress */
export const SiftUpInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed enqueue — heap property restored, element at correct priority position */
export const EnqueueComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
