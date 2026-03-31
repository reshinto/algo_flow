/**
 * Storybook stories for the Heap Extract Max algorithm pipeline.
 * Uses the real step generator with a 7-element max-heap,
 * rendering the HeapVisualizer at key extraction states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateHeapExtractMaxSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/HeapVisualizer";

const steps = generateHeapExtractMaxSteps({ array: [9, 7, 8, 3, 5, 6, 1] });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Heap Extract Max",
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

/** Initial state — max-heap before extraction begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-extraction — root removed, last element moved to root, sift-down in progress */
export const SiftDownInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed extraction — max-heap property fully restored after removing the maximum */
export const ExtractComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
