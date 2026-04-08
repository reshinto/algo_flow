/**
 * Storybook stories for the Search a 2D Matrix algorithm pipeline.
 * Uses the real step generator with the default 3×4 matrix,
 * rendering the MatrixVisualizer at key binary search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateSearch2DMatrixSteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateSearch2DMatrixSteps({
  matrix: [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ],
  target: 3,
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Search 2D Matrix",
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

/** Initial state — all cells default, binary search initialized */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** First midpoint comparison — cell highlighted as comparing */
export const FirstComparison: Story = {
  args: {
    visualState: steps[1]!.visualState as MatrixVisualState,
  },
};

/** Mid-search — several cells eliminated, search space narrowed */
export const MidSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.5)]!.visualState as MatrixVisualState,
  },
};

/** Final state — target cell marked as found */
export const Found: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
