/**
 * Storybook stories for Two Sum (Sorted Array) pipeline.
 * Uses the real step generator with the default 7-element sorted array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateTwoPointerSumSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateTwoPointerSumSteps({
  sortedArray: [1, 2, 4, 6, 8, 11, 15],
  target: 10,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Two Pointer Sum",
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

/** Initial state — both pointers initialized at the array ends */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — pointers have converged partway, some elements eliminated */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — matching pair found and marked */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
