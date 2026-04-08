/**
 * Storybook stories for the Anti-Diagonal Traversal algorithm pipeline.
 * Uses the real step generator with the default 3×3 matrix,
 * rendering the MatrixVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateAntiDiagonalTraversalSteps } from "../step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateAntiDiagonalTraversalSteps({
  matrix: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Anti-Diagonal Traversal",
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

/** Initial state — all cells default, first anti-diagonal queued */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** Early diagonals — top-left corner collected, second diagonal in progress */
export const EarlyDiagonals: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as MatrixVisualState,
  },
};

/** Mid-traversal — central anti-diagonal (longest) being collected */
export const CentralDiagonal: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.55)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all elements collected in anti-diagonal order */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
