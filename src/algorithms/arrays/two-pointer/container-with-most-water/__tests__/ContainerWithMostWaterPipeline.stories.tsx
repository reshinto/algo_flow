/**
 * Storybook stories for Container With Most Water pipeline.
 * Uses the real step generator with the default 9-element array [1,8,6,2,5,4,8,3,7],
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateContainerWithMostWaterSteps } from "../step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateContainerWithMostWaterSteps({
  heights: [1, 8, 6, 2, 5, 4, 8, 3, 7],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Container With Most Water",
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

/** Initial state — two pointers at both ends, maxArea initialized to 0 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — pointers converging inward, current best container identified */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — optimal container pair marked, maximum area reported */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
