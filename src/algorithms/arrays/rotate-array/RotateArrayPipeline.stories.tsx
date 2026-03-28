/**
 * Storybook stories for Rotate Array (Reversal Method) pipeline.
 * Uses the real step generator with the default 7-element array rotated by 3,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateRotateArraySteps } from "@/algorithms/arrays/rotate-array/step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateRotateArraySteps({
  inputArray: [1, 2, 3, 4, 5, 6, 7],
  rotateCount: 3,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Rotate Array",
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

/** Initial state — array loaded, reversal not yet started */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — full reversal complete, left segment reversal in progress */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all three reversals complete, array fully rotated */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
