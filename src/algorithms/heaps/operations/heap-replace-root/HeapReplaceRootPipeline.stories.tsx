/**
 * Storybook stories for the Heap Replace Root algorithm pipeline.
 * Renders the HeapVisualizer at key states: initial, mid-sift-down, and final.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateHeapReplaceRootSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateHeapReplaceRootSteps({ array: [1, 3, 5, 7, 9, 8, 6], newValue: 10 });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Heap Replace Root",
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

/** Initial state — min-heap before the root is replaced */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid sift-down — new root value sinking toward its correct position */
export const MidSiftDown: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed — new root placed, heap property fully restored */
export const ReplaceRootComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
