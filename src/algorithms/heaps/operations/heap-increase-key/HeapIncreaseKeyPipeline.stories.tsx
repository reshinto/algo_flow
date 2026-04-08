/**
 * Storybook stories for the Heap Increase Key algorithm pipeline.
 * Renders the HeapVisualizer at key states: initial, mid-sift-down, and final.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateHeapIncreaseKeySteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateHeapIncreaseKeySteps({
  array: [1, 3, 5, 7, 9, 8, 6],
  targetIndex: 1,
  newValue: 10,
});

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Heap Increase Key",
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

/** Initial state — min-heap before the key is increased */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid sift-down — updated node sinking toward the leaves */
export const MidSiftDown: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed — heap property fully restored after increase-key */
export const IncreaseKeyComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
