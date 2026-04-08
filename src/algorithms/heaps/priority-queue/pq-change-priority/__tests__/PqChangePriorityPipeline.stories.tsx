/**
 * Storybook stories for the PQ Change Priority algorithm pipeline.
 * Uses the real step generator with a 7-element min-heap and a priority decrease at index 4,
 * rendering the HeapVisualizer at key change-priority states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generatePqChangePrioritySteps } from "../step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generatePqChangePrioritySteps({
  array: [2, 5, 3, 10, 15, 8, 7],
  targetIndex: 4,
  newValue: 1,
});

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/PQ Change Priority",
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

/** Initial state — priority queue before priority change begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-change — value updated, sift-up in progress to restore heap order */
export const SiftInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed change — heap property restored with updated priority */
export const PriorityChangeComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
