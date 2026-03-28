/**
 * Storybook stories for Lomuto Partition pipeline.
 * Uses the real step generator with the default 8-element array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateLomutoPartitionSteps } from "@/algorithms/arrays/lomuto-partition/step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateLomutoPartitionSteps({
  inputArray: [8, 3, 6, 1, 5, 9, 2, 7],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Lomuto Partition",
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

/** Initial state — array loaded, pivot highlighted at the last position */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — boundary pointer advanced, some elements partitioned */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — pivot placed in sorted position, left and right partitions formed */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
