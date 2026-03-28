/**
 * Storybook stories for the First Missing Positive algorithm pipeline.
 * Uses the real step generator with default inputs, rendering the ArrayVisualizer
 * at key phases showing placement swaps and the final mismatch scan.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateFirstMissingPositiveSteps } from "@/algorithms/arrays/first-missing-positive/step-generator";
import ArrayVisualizer from "./ArrayVisualizer";

const steps = generateFirstMissingPositiveSteps({
  inputArray: [3, 4, -1, 1, 7, 5, 2],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/First Missing Positive",
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

/** Initial state — unsorted array before placement phase */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Placement phase — swaps rearranging values to their correct indices */
export const PlacementPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 3)]!.visualState as ArrayVisualState,
  },
};

/** Scan phase — scanning for the first index mismatch */
export const ScanPhase: Story = {
  args: {
    visualState: steps[Math.floor((steps.length * 2) / 3)]!.visualState as ArrayVisualState,
  },
};

/** Final state — first missing positive identified */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
