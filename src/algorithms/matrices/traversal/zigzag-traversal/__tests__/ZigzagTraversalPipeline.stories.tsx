/**
 * Storybook stories for the Zigzag Traversal algorithm pipeline.
 * Uses the real step generator with the default 3×3 matrix,
 * rendering the MatrixVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateZigzagTraversalSteps } from "../step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateZigzagTraversalSteps({
  matrix: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Zigzag Traversal",
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

/** Initial state — all cells default, first diagonal about to start */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** First upward diagonal collected — element 1 visited */
export const FirstDiagonalUp: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.2)]!.visualState as MatrixVisualState,
  },
};

/** Mid-traversal — alternating diagonals partially collected */
export const MidTraversal: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.55)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all elements collected in zigzag order */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
