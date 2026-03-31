/**
 * Storybook stories for the Heap Extract Min algorithm pipeline.
 * Uses the real step generator with a 7-element min-heap,
 * rendering the HeapVisualizer at key extraction states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateHeapExtractMinSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/HeapVisualizer";

const steps = generateHeapExtractMinSteps({ array: [1, 3, 5, 7, 9, 8, 6] });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Heap Extract Min",
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

/** Initial state — min-heap before extraction begins */
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

/** Completed extraction — heap property fully restored after removing the minimum */
export const ExtractComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
