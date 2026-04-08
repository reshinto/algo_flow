/**
 * Storybook stories for Min Size Subarray Sum pipeline.
 * Uses the real step generator with the default 6-element array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateMinSizeSubarraySumSteps } from "../step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateMinSizeSubarraySumSteps({
  inputArray: [2, 3, 1, 2, 4, 3],
  target: 7,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Min Size Subarray Sum",
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

/** Initial state — left and right pointers both at index 0 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — window expanding and contracting around target sum */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — shortest qualifying subarray found */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
