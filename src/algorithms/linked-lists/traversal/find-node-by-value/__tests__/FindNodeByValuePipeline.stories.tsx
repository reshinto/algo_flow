/**
 * Storybook stories for the Find Node by Value algorithm pipeline.
 * Uses the real step generator with a 5-node list searching for value 7,
 * rendering the LinkedListVisualizer at key search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { LinkedListVisualState } from "@/types";
import { generateFindNodeByValueSteps } from "../step-generator";
import LinkedListVisualizer from "@/components/visualization/linked-lists/LinkedListVisualizer";

const steps = generateFindNodeByValueSteps({
  values: [4, 2, 7, 1, 9],
  target: 7,
});

const meta: Meta<typeof LinkedListVisualizer> = {
  title: "Algorithm Pipelines/Find Node by Value",
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

/** Initial state — current pointer at head, ready to search for target */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as LinkedListVisualState,
  },
};

/** Mid-search comparing nodes without finding the target yet */
export const MidSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as LinkedListVisualState,
  },
};

/** Completed search — target node found or entire list exhausted */
export const SearchComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as LinkedListVisualState,
  },
};
