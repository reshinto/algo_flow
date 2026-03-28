/**
 * Storybook stories for the Difference Array (Range Update) algorithm pipeline.
 * Uses the real step generator with default inputs, rendering the ArrayVisualizer
 * at key phases showing both the difference array and the reconstructed result.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateDifferenceArraySteps } from "@/algorithms/arrays/difference-array/step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateDifferenceArraySteps({
  arrayLength: 8,
  updates: [
    [1, 4, 3],
    [2, 6, -1],
    [0, 3, 2],
  ],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Difference Array",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — empty difference array and result array */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-update phase — difference array partially populated */
export const MidUpdate: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 3)]!.visualState as ArrayVisualState,
  },
};

/** Reconstruction phase — prefix sum being applied to recover result */
export const Reconstructing: Story = {
  args: {
    visualState: steps[Math.floor((steps.length * 2) / 3)]!.visualState as ArrayVisualState,
  },
};

/** Final state — result array fully reconstructed with all range updates applied */
export const ReconstructionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
