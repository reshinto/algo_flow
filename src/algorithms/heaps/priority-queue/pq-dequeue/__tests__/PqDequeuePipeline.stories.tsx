/**
 * Storybook stories for the PQ Dequeue algorithm pipeline.
 * Uses the real step generator with a 7-element min-heap,
 * rendering the HeapVisualizer at key dequeue states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generatePqDequeueSteps } from "../step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generatePqDequeueSteps({ array: [2, 5, 3, 10, 15, 8, 7] });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/PQ Dequeue",
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

/** Initial state — priority queue before dequeue begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-dequeue — root extracted, sift-down in progress */
export const SiftDownInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed dequeue — heap property restored with one fewer element */
export const DequeueComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
