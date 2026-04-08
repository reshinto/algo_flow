/**
 * Storybook stories for the Linked List Length algorithm pipeline.
 * Uses the real step generator with a 5-node list,
 * rendering the LinkedListVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { LinkedListVisualState } from "@/types";
import { generateLinkedListLengthSteps } from "../step-generator";
import LinkedListVisualizer from "@/components/visualization/linked-lists/LinkedListVisualizer";

const steps = generateLinkedListLengthSteps({ values: [1, 2, 3, 4, 5] });

const meta: Meta<typeof LinkedListVisualizer> = {
  title: "Algorithm Pipelines/Linked List Length",
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

/** Initial state — current pointer at head, count = 0 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as LinkedListVisualState,
  },
};

/** Mid-traversal with some nodes visited and count incremented */
export const MidTraversal: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as LinkedListVisualState,
  },
};

/** Completed traversal — all nodes counted, final length determined */
export const TraversalComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as LinkedListVisualState,
  },
};
