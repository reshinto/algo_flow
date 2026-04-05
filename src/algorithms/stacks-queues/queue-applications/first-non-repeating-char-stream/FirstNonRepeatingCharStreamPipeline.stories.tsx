/**
 * Storybook stories for the First Non-Repeating Char Stream algorithm pipeline.
 * Uses the real step generator with "aabcbcd", rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateFirstNonRepeatingCharStreamSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/StackQueueVisualizer";

const defaultSteps = generateFirstNonRepeatingCharStreamSteps({ inputString: "aabcbcd" });
const allUniqueSteps = generateFirstNonRepeatingCharStreamSteps({ inputString: "abcd" });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/First Non-Repeating Char Stream",
  component: StackQueueVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StackQueueVisualizer>;

/** Initial state — empty queue and frequency map before any characters are processed */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing — some characters enqueued, repeated characters pruned from the front */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed — all characters processed, final results array available */
export const Complete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** All unique characters — queue never pruned, front is always the first character */
export const AllUnique: Story = {
  args: {
    visualState: allUniqueSteps[allUniqueSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
