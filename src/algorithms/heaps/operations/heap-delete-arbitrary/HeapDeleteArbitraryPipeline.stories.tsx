/**
 * Storybook stories for the Heap Delete Arbitrary algorithm pipeline.
 * Renders the HeapVisualizer at key states: initial, mid-operation, and final.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateHeapDeleteArbitrarySteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/HeapVisualizer";

const steps = generateHeapDeleteArbitrarySteps({ array: [1, 3, 5, 7, 9, 8, 6], targetIndex: 2 });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Heap Delete Arbitrary",
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

/** Initial state — min-heap before deletion begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-deletion — target marked for extraction, replacement in progress */
export const MidDeletion: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed deletion — heap restored with one fewer element */
export const DeletionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
