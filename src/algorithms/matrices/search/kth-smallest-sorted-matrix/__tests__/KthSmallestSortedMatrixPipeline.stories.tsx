/**
 * Storybook stories for the Kth Smallest Element in Sorted Matrix algorithm pipeline.
 * Uses the real step generator with the default 3×3 matrix (k=8),
 * rendering the MatrixVisualizer at key search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateKthSmallestSortedMatrixSteps } from "../step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateKthSmallestSortedMatrixSteps({
  matrix: [
    [1, 5, 9],
    [10, 11, 13],
    [12, 13, 15],
  ],
  targetK: 8,
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Kth Smallest in Sorted Matrix",
  component: MatrixVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MatrixVisualizer>;

/** Initial state — search bounds initialized */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** Early binary search — first staircase walk in progress */
export const StaircaseWalk: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.3)]!.visualState as MatrixVisualState,
  },
};

/** Mid-search — value range narrowed, cells compared */
export const NarrowedRange: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.65)]!.visualState as MatrixVisualState,
  },
};

/** Final state — kth smallest element found */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
