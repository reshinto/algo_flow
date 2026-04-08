/**
 * Storybook stories for the Four Sum algorithm pipeline.
 * Uses the real step generator with the default six-element input,
 * rendering the ArrayVisualizer at key anchor/two-pointer states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateFourSumSteps } from "../step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateFourSumSteps({
  inputArray: [1, 0, -1, 0, -2, 2],
  target: 0,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Four Sum",
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

/** Initial state — sorted array before any anchor is fixed */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — two-pointer searching with fixed outer anchors */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all unique quadruplets discovered */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
