/**
 * Storybook stories for the Largest Rectangle in Histogram algorithm pipeline.
 * Uses the real step generator with the default 6-element heights array,
 * rendering the ArrayVisualizer at key monotonic stack execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateLargestRectangleHistogramSteps } from "../step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateLargestRectangleHistogramSteps({
  heights: [2, 1, 5, 6, 2, 3],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Largest Rectangle Histogram",
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

/** Initial state — stack empty, ready to begin processing bars */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — stack populated, popping taller bars to compute areas */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — maximum rectangle area identified */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
