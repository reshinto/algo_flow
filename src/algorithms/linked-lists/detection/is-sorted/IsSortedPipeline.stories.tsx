/**
 * Storybook stories for the Check if Sorted algorithm pipeline.
 * Uses the real step generator with different list states,
 * rendering the LinkedListVisualizer at key comparison states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { LinkedListVisualState } from "@/types";
import { generateIsSortedSteps } from "./step-generator";
import LinkedListVisualizer from "@/components/visualization/LinkedListVisualizer";

const stepsForSortedList = generateIsSortedSteps({ values: [1, 3, 5, 7, 9] });
const stepsForUnsortedList = generateIsSortedSteps({ values: [1, 5, 3, 7, 9] });

const meta: Meta<typeof LinkedListVisualizer> = {
  title: "Algorithm Pipelines/Check if Sorted",
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

/** Initial state — list before any comparisons */
export const InitialState: Story = {
  args: {
    visualState: stepsForSortedList[0]!.visualState as LinkedListVisualState,
  },
};

/** Mid-comparison in a sorted list — comparing adjacent nodes */
export const SortedListComparison: Story = {
  args: {
    visualState: stepsForSortedList[Math.floor(stepsForSortedList.length / 2)]!
      .visualState as LinkedListVisualState,
  },
};

/** Completion of a sorted list — result is true */
export const SortedListComplete: Story = {
  args: {
    visualState: stepsForSortedList[stepsForSortedList.length - 1]!
      .visualState as LinkedListVisualState,
  },
};

/** Mid-comparison in an unsorted list — finding out-of-order pair */
export const UnsortedListDetection: Story = {
  args: {
    visualState: stepsForUnsortedList[Math.floor(stepsForUnsortedList.length / 2)]!
      .visualState as LinkedListVisualState,
  },
};

/** Completion of an unsorted list — result is false */
export const UnsortedListComplete: Story = {
  args: {
    visualState: stepsForUnsortedList[stepsForUnsortedList.length - 1]!
      .visualState as LinkedListVisualState,
  },
};
