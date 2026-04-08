/**
 * Storybook stories for the Longest Valid Parentheses algorithm pipeline.
 * Uses the real step generator with "(()())", rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateLongestValidParenthesesSteps } from "../step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateLongestValidParenthesesSteps({ inputString: "(()())" });
const partialSteps = generateLongestValidParenthesesSteps({ inputString: "(()" });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Longest Valid Parentheses",
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

/** Initial state — sentinel -1 on the stack, full input unprocessed */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing with indices on the stack and a running maxLength */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Complete — longest valid substring length computed */
export const Complete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Partial match — input with no full closure, showing base reset behavior */
export const PartialMatch: Story = {
  args: {
    visualState: partialSteps[partialSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
