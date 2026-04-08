/**
 * Storybook stories for the Remove Duplicates from Sorted List algorithm pipeline.
 * Uses the real step generator with a list containing consecutive duplicates,
 * rendering the LinkedListVisualizer at key deduplication states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { LinkedListVisualState } from "@/types";
import { generateRemoveDuplicatesSortedSteps } from "./step-generator";
import LinkedListVisualizer from "@/components/visualization/linked-lists/LinkedListVisualizer";

const steps = generateRemoveDuplicatesSortedSteps({
  values: [1, 1, 2, 3, 3, 3, 4, 5, 5],
});

const meta: Meta<typeof LinkedListVisualizer> = {
  title: "Algorithm Pipelines/Remove Duplicates from Sorted List",
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

/** Initial state — original list with consecutive duplicate nodes */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as LinkedListVisualState,
  },
};

/** Mid-deduplication with some duplicate groups already removed */
export const DeduplicationInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as LinkedListVisualState,
  },
};

/** Completed deduplication — all consecutive duplicates removed, unique values only */
export const DeduplicationComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as LinkedListVisualState,
  },
};
