/**
 * Storybook stories for the Valid Parentheses algorithm pipeline.
 * Uses the real step generator with "({[]})", rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateValidParenthesesSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const validSteps = generateValidParenthesesSteps({ inputString: "({[]})" });
const invalidSteps = generateValidParenthesesSteps({ inputString: "([)]" });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Valid Parentheses",
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

/** Initial state — full input string unprocessed, empty stack */
export const InitialState: Story = {
  args: {
    visualState: validSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing with some brackets pushed onto the stack */
export const MidProcessing: Story = {
  args: {
    visualState: validSteps[Math.floor(validSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed valid string — empty stack, all brackets matched */
export const ValidComplete: Story = {
  args: {
    visualState: validSteps[validSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Mismatch detected — invalid string terminated early */
export const MismatchDetected: Story = {
  args: {
    visualState: invalidSteps[invalidSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
