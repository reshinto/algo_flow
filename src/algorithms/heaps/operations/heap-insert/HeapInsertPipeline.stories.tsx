/**
 * Storybook stories for the Heap Insert algorithm pipeline.
 * Uses the real step generator with a 7-element min-heap and value 2,
 * rendering the HeapVisualizer at key insertion states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateHeapInsertSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateHeapInsertSteps({ array: [1, 3, 5, 7, 9, 8, 6], value: 2 });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Heap Insert",
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

/** Initial state — min-heap before insertion begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-insertion — new node appended and sift-up in progress */
export const SiftUpInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed insertion — heap property fully restored */
export const InsertComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
