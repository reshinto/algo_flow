/**
 * Storybook stories for Sliding Window Min Sum pipeline.
 * Uses the real step generator with the default 10-element array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateSlidingWindowMinSumSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateSlidingWindowMinSumSteps({
  inputArray: [4, 2, 1, 7, 8, 1, 2, 8, 1, 0],
  windowSize: 3,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Sliding Window Min Sum",
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

/** Initial state — first window computed as the starting minimum */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — window sliding and comparing sums */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — minimum sum window identified */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
