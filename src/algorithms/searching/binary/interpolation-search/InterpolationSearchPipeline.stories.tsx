/**
 * Storybook stories for the Interpolation Search algorithm pipeline.
 * Uses the real step generator with a sorted array and target value,
 * rendering the ArrayVisualizer at key interpolation search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateInterpolationSearchSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateInterpolationSearchSteps({
  sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
  targetValue: 23,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Interpolation Search",
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

/** Initial state before interpolation estimates are computed */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-search showing the interpolated position probe */
export const MidSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Target found after interpolation converged */
export const TargetFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
