/**
 * Storybook stories for the Backspace String Compare algorithm pipeline.
 * Uses the real step generator with "ab#c" / "ad#c", rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateBackspaceStringCompareSteps } from "../step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const equalSteps = generateBackspaceStringCompareSteps({
  firstString: "ab#c",
  secondString: "ad#c",
});
const unequalSteps = generateBackspaceStringCompareSteps({
  firstString: "a#c",
  secondString: "b",
});

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Backspace String Compare",
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

/** Initial state — combined input string unprocessed, empty stack */
export const InitialState: Story = {
  args: {
    visualState: equalSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing with some characters pushed onto the stack */
export const MidProcessing: Story = {
  args: {
    visualState: equalSteps[Math.floor(equalSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed — both strings resolve to equal results */
export const EqualStrings: Story = {
  args: {
    visualState: equalSteps[equalSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Completed — strings resolve to different results */
export const UnequalStrings: Story = {
  args: {
    visualState: unequalSteps[unequalSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
