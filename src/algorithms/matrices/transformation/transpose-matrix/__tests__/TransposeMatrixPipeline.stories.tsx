/**
 * Storybook stories for the Transpose Matrix algorithm pipeline.
 * Uses the real step generator with the default 3×3 square matrix,
 * rendering the MatrixVisualizer at key transformation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateTransposeMatrixSteps } from "../step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateTransposeMatrixSteps({
  matrix: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Transpose Matrix",
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

/** Initial state — original matrix, no swaps yet */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** First swap — (0,1) ↔ (1,0) highlighted */
export const FirstSwap: Story = {
  args: {
    visualState: steps[1]!.visualState as MatrixVisualState,
  },
};

/** Mid-transposition — several cells already swapped */
export const MidTranspose: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.6)]!.visualState as MatrixVisualState,
  },
};

/** Final state — fully transposed matrix */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
