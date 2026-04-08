/**
 * Storybook stories for the Diagonal Traversal algorithm pipeline.
 * Uses the real step generator with the default 3×4 matrix,
 * rendering the MatrixVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateDiagonalTraversalSteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateDiagonalTraversalSteps({
  matrix: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Diagonal Traversal",
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

/** Initial state — matrix untouched, first diagonal about to start */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** Mid-traversal — first few diagonals collected */
export const MidTraversal: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.4)]!.visualState as MatrixVisualState,
  },
};

/** Late traversal — most diagonals collected, approaching bottom-right */
export const LateTraversal: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.75)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all elements collected in diagonal order */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
