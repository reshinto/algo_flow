/**
 * Storybook stories for the Evaluate Reverse Polish algorithm pipeline.
 * Uses the real step generator with ["2", "1", "+", "3", "*"], rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateEvaluateReversePolishSteps } from "../step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateEvaluateReversePolishSteps({ tokens: ["2", "1", "+", "3", "*"] });
const complexSteps = generateEvaluateReversePolishSteps({
  tokens: ["4", "13", "5", "/", "+"],
});

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Evaluate Reverse Polish",
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

/** Initial state — full token list unprocessed, empty operand stack */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing with operands pushed and first evaluation complete */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed evaluation — single result value on the stack */
export const EvaluationComplete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Division then addition — ["4", "13", "5", "/", "+"] = 6 */
export const DivisionThenAddition: Story = {
  args: {
    visualState: complexSteps[complexSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
