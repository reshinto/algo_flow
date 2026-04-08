/**
 * Storybook stories for Minimum Subarray Sum (Inverted Kadane's) pipeline.
 * Uses the real step generator with the default 7-element array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateMinimumSubarraySumSteps } from "../step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateMinimumSubarraySumSteps({
  inputArray: [3, -4, 2, -3, -1, 7, -5],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Minimum Subarray Sum",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — first element set as starting minimum */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — scanning and updating minimum running sum */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — minimum sum subarray identified */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
