/**
 * Storybook stories for the Reverse Linked List algorithm pipeline.
 * Uses the real step generator with a 5-node list,
 * rendering the LinkedListVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { LinkedListVisualState } from "@/types";
import { generateReverseLinkedListSteps } from "@/algorithms/linked-lists/reverse-linked-list/step-generator";
import LinkedListVisualizer from "./LinkedListVisualizer";

const steps = generateReverseLinkedListSteps({ values: [1, 2, 3, 4, 5] });

const meta: Meta<typeof LinkedListVisualizer> = {
  title: "Algorithm Pipelines/Reverse Linked List",
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

/** Initial state — original list before any pointers are reversed */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as LinkedListVisualState,
  },
};

/** Mid-reversal with some nodes processed and pointers redirected */
export const MidReversal: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as LinkedListVisualState,
  },
};

/** Completed reversal — all nodes processed, list is reversed */
export const ReversalComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as LinkedListVisualState,
  },
};
