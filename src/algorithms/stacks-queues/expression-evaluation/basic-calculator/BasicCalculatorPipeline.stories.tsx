/**
 * Storybook stories for the Basic Calculator algorithm pipeline.
 * Uses the real step generator with "1 + (2 - 3)", rendering the
 * StackQueueVisualizer at key evaluation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateBasicCalculatorSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/StackQueueVisualizer";

const defaultSteps = generateBasicCalculatorSteps({ expression: "1 + (2 - 3)" });
const complexSteps = generateBasicCalculatorSteps({ expression: "(1+(4+5+2)-3)+(6+8)" });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Basic Calculator",
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

/** Initial state — full token list unprocessed, empty stack */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing with tokens partially evaluated */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed evaluation — final result with empty stack */
export const EvaluationComplete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Complex nested expression — mid-evaluation with parentheses on stack */
export const ComplexExpression: Story = {
  args: {
    visualState: complexSteps[Math.floor(complexSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};
