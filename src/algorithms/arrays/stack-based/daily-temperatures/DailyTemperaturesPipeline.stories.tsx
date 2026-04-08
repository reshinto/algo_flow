/**
 * Storybook stories for Daily Temperatures pipeline.
 * Uses the real step generator with the default 8-element temperature array
 * [73, 74, 75, 71, 69, 72, 76, 73], rendering the ArrayVisualizer at key
 * execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateDailyTemperaturesSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateDailyTemperaturesSteps({
  temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Daily Temperatures",
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

/** Initial state — temperatures loaded, stack empty, wait days all zero */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — monotonic stack partially built, some days resolved */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all days resolved, remaining stack entries marked as zero wait */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
