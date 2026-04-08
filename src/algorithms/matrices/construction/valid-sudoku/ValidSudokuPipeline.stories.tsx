/**
 * Storybook stories for the Valid Sudoku algorithm pipeline.
 * Uses the real step generator with the default partial board,
 * rendering the MatrixVisualizer at key validation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateValidSudokuSteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateValidSudokuSteps({
  board: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Valid Sudoku",
  component: MatrixVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 600, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MatrixVisualizer>;

/** Initial state — board loaded, sets initialized */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** Partial validation — first few rows checked */
export const PartialValidation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as MatrixVisualState,
  },
};

/** Mid-validation — roughly halfway through the board */
export const MidValidation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.6)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all filled cells verified valid */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
