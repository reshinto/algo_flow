/**
 * Storybook stories for the Insert at Position algorithm pipeline.
 * Uses the real step generator with a 4-node list inserting value 4 at position 2,
 * rendering the LinkedListVisualizer at key insertion states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { LinkedListVisualState } from "@/types";
import { generateInsertAtPositionSteps } from "./step-generator";
import LinkedListVisualizer from "@/components/visualization/linked-lists/LinkedListVisualizer";

const steps = generateInsertAtPositionSteps({
  values: [1, 3, 5, 7],
  insertValue: 4,
  position: 2,
});

const meta: Meta<typeof LinkedListVisualizer> = {
  title: "Algorithm Pipelines/Insert at Position",
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

/** Initial state — original list before traversal begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as LinkedListVisualState,
  },
};

/** Mid-insertion with traversal to the predecessor node complete */
export const PreparingInsertion: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as LinkedListVisualState,
  },
};

/** Completed insertion — new node spliced into the list */
export const InsertionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as LinkedListVisualState,
  },
};
