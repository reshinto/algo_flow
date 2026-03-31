/**
 * Storybook stories for the Merge Two Sorted Lists algorithm pipeline.
 * Uses the real step generator with two 3-node lists,
 * rendering the LinkedListVisualizer at key merge states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { LinkedListVisualState } from "@/types";
import { generateMergeTwoSortedSteps } from "./step-generator";
import LinkedListVisualizer from "@/components/visualization/LinkedListVisualizer";

const steps = generateMergeTwoSortedSteps({
  listA: [1, 3, 5],
  listB: [2, 4, 6],
});

const meta: Meta<typeof LinkedListVisualizer> = {
  title: "Algorithm Pipelines/Merge Two Sorted Lists",
  component: LinkedListVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LinkedListVisualizer>;

/** Initial state — dummy node, both heads initialized */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as LinkedListVisualState,
  },
};

/** Mid-merge with some nodes already linked */
export const MidMerge: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as LinkedListVisualState,
  },
};

/** Completed merge — all nodes linked in sorted order */
export const MergeComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as LinkedListVisualState,
  },
};
