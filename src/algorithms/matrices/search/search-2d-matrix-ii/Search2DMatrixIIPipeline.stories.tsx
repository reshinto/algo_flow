/**
 * Storybook stories for the Search a 2D Matrix II algorithm pipeline.
 * Uses the real step generator with the default 5×5 matrix,
 * rendering the MatrixVisualizer at key staircase search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateSearch2DMatrixIISteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/MatrixVisualizer";

const steps = generateSearch2DMatrixIISteps({
  matrix: [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30],
  ],
  target: 5,
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Search 2D Matrix II",
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

/** Initial state — all cells default, staircase initialized at top-right */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** First comparison — top-right cell highlighted */
export const FirstComparison: Story = {
  args: {
    visualState: steps[1]!.visualState as MatrixVisualState,
  },
};

/** Mid-staircase — pointer has moved left and down eliminating cells */
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
