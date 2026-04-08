/**
 * Storybook stories for the Quickselect algorithm pipeline.
 * Renders the ArrayVisualizer at key states — initialization, pivot selection,
 * partitioning comparisons, pivot placement, and final completion.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateQuickselectSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateQuickselectSteps({
  inputArray: [7, 2, 1, 6, 8, 5, 3, 4],
  targetK: 4,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Quickselect",
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

/** Initial state — unsorted array before selection begins */
export const Initialized: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Pivot selected — pivot element highlighted before partition scan */
export const PivotSelected: Story = {
  args: {
    visualState: steps[Math.min(1, steps.length - 1)]!.visualState as ArrayVisualState,
  },
};

/** Partitioning — comparing elements against the pivot */
export const Partitioning: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 3)]!.visualState as ArrayVisualState,
  },
};

/** Final state — k-th smallest element located */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
