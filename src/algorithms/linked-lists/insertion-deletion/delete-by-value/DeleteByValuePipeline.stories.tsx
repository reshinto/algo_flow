/**
 * Storybook stories for the Delete by Value algorithm pipeline.
 * Uses the real step generator with a 5-node list deleting value 3,
 * rendering the LinkedListVisualizer at key deletion states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { LinkedListVisualState } from "@/types";
import { generateDeleteByValueSteps } from "./step-generator";
import LinkedListVisualizer from "@/components/visualization/linked-lists/LinkedListVisualizer";

const steps = generateDeleteByValueSteps({
  values: [1, 2, 3, 4, 5],
  target: 3,
});

const meta: Meta<typeof LinkedListVisualizer> = {
  title: "Algorithm Pipelines/Delete by Value",
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

/** Initial state — original list before searching for the target */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as LinkedListVisualState,
  },
};

/** Mid-search with traversal in progress looking for the target value */
export const SearchingForTarget: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as LinkedListVisualState,
  },
};

/** Completed deletion — target node removed from the list */
export const DeletionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as LinkedListVisualState,
  },
};
