/**
 * Storybook stories for the Heap Decrease Key algorithm pipeline.
 * Renders the HeapVisualizer at key states: initial, mid-sift, and final.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateHeapDecreaseKeySteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateHeapDecreaseKeySteps({
  array: [1, 5, 3, 7, 9, 8, 6],
  targetIndex: 3,
  newValue: 2,
});

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Heap Decrease Key",
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

/** Initial state — min-heap before the key is decreased */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid sift-up — updated node bubbling toward the root */
export const MidSiftUp: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed — heap property fully restored after decrease-key */
export const DecreaseKeyComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
