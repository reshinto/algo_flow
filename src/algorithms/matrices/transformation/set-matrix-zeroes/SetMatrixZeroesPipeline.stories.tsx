/**
 * Storybook stories for the Set Matrix Zeroes algorithm pipeline.
 * Uses the real step generator with the default 3×4 matrix,
 * rendering the MatrixVisualizer at key transformation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateSetMatrixZeroesSteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/MatrixVisualizer";

const steps = generateSetMatrixZeroesSteps({
  matrix: [
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Set Matrix Zeroes",
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

/** Initial state — original matrix with zeros visible */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** After scanning — zeros marked, first row/col used as markers */
export const AfterScanning: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.35)]!.visualState as MatrixVisualState,
  },
};

/** Mid-zeroing — some rows and columns already zeroed */
export const MidZeroing: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.7)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all affected rows and columns zeroed */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
