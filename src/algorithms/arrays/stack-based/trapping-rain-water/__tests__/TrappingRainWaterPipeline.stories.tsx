/**
 * Storybook stories for the Trapping Rain Water algorithm pipeline.
 * Uses the real step generator with the classic 12-element heights array,
 * rendering the ArrayVisualizer at key two-pointer execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateTrappingRainWaterSteps } from "../step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateTrappingRainWaterSteps({
  heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Trapping Rain Water",
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

/** Initial state — pointers at both ends, no water computed yet */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — two pointers converging, water being accumulated */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all water computed, total displayed */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
