/**
 * Storybook stories for the Reshape Matrix algorithm pipeline.
 * Uses the real step generator with a 2×4 → 4×2 reshape,
 * rendering the MatrixVisualizer at key placement states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateReshapeMatrixSteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateReshapeMatrixSteps({
  matrix: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ],
  targetRows: 4,
  targetCols: 2,
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Reshape Matrix",
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

/** Initial state — source matrix loaded, reshape validated */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** First elements being placed into target positions */
export const EarlyPlacement: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.3)]!.visualState as MatrixVisualState,
  },
};

/** Mid-reshape — first row of output complete */
export const MidReshape: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.6)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all elements placed in target shape */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
