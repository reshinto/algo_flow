/**
 * Storybook stories for the Infix to Postfix (Shunting-Yard) algorithm pipeline.
 * Uses the real step generator with "a+b*(c-d)", rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateInfixToPostfixSteps } from "../step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateInfixToPostfixSteps({ expression: "a+b*(c-d)" });
const simpleSteps = generateInfixToPostfixSteps({ expression: "(a+b)*c" });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Infix to Postfix",
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

/** Initial state — full token stream unprocessed, empty operator stack and output */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing — some tokens processed with operators accumulated on the stack */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed — operator stack drained, full postfix output queue visible */
export const ConversionComplete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Parenthesized expression — shows how parens group operators correctly */
export const ParenthesizedExpression: Story = {
  args: {
    visualState: simpleSteps[simpleSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
