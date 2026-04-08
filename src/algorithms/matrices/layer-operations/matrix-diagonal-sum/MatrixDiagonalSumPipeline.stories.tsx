/**
 * Storybook stories for the Matrix Diagonal Sum algorithm pipeline.
 * Uses the real step generator with the default 3×3 matrix,
 * rendering the MatrixVisualizer at key accumulation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateMatrixDiagonalSumSteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateMatrixDiagonalSumSteps({
  matrix: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Matrix Diagonal Sum",
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

/** Initial state — all cells default, sum = 0 */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** Primary diagonal being accumulated */
export const PrimaryDiagonal: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as MatrixVisualState,
  },
};

/** Secondary diagonal accumulation in progress */
export const SecondaryDiagonal: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.65)]!.visualState as MatrixVisualState,
  },
};

/** Final state — both diagonals summed, center adjusted */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
