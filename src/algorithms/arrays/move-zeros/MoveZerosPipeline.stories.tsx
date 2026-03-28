/**
 * Storybook stories for Move Zeros to End pipeline.
 * Uses the real step generator with the default 7-element array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateMoveZerosSteps } from "@/algorithms/arrays/move-zeros/step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateMoveZerosSteps({
  inputArray: [0, 1, 0, 3, 12, 0, 5],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Move Zeros",
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

/** Initial state — array as given with write pointer at zero */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — some non-zeros swapped to front, zeros accumulating at back */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all non-zeros at front, all zeros at end */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
