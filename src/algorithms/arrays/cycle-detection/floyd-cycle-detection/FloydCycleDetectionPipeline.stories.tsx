/**
 * Storybook stories for the Floyd Cycle Detection algorithm pipeline.
 * Uses the real step generator with default inputs, rendering the ArrayVisualizer
 * at key phases showing tortoise-hare pointer movement and cycle detection.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateFloydCycleDetectionSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateFloydCycleDetectionSteps({
  inputArray: [1, 3, 4, 2, 2],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Floyd Cycle Detection",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — array before any pointer movement */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — tortoise and hare traversing the array */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — cycle entrance identified, algorithm complete */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
