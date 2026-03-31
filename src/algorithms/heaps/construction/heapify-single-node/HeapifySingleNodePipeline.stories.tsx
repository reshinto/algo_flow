/**
 * Storybook stories for the Heapify Single Node algorithm pipeline.
 * Uses the real step generator with a 9-element array targeting the root,
 * rendering the HeapVisualizer at key sift-down states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateHeapifySingleNodeSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/HeapVisualizer";

const steps = generateHeapifySingleNodeSteps({
  array: [9, 1, 7, 2, 3, 8, 5, 6, 4],
  targetIndex: 0,
});

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Heapify Single Node",
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

/** Initial state — out-of-place root node before sift-down begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid sift-down with the target node partway to its final position */
export const MidSiftDown: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed — target node has reached its correct position */
export const HeapifyComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
