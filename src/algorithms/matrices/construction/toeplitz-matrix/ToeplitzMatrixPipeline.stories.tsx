/**
 * Storybook stories for the Toeplitz Matrix algorithm pipeline.
 * Uses the real step generator with the default 3×4 Toeplitz matrix,
 * rendering the MatrixVisualizer at key verification states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateToeplitzMatrixSteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/MatrixVisualizer";

const steps = generateToeplitzMatrixSteps({
  matrix: [
    [1, 2, 3, 4],
    [5, 1, 2, 3],
    [9, 5, 1, 2],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Toeplitz Matrix",
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

/** Initial state — matrix loaded, ready to verify diagonals */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** First diagonal check — comparing first interior cell with upper-left neighbor */
export const FirstComparison: Story = {
  args: {
    visualState: steps[Math.min(1, steps.length - 1)]!.visualState as MatrixVisualState,
  },
};

/** Mid verification — several diagonals confirmed */
export const MidVerification: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.5)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all diagonals verified, matrix confirmed Toeplitz */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
