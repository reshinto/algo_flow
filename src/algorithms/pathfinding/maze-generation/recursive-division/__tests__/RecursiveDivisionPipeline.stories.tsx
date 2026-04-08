/**
 * Storybook stories for the Recursive Division Maze pipeline.
 * Uses the real step generator with a small open grid,
 * rendering the GridVisualizer at key maze generation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GridVisualState, GridCell } from "@/types";
import { generateRecursiveDivisionSteps } from "../step-generator";
import GridVisualizer from "@/components/visualization/graph/GridVisualizer";

/** Build a small open grid for Recursive Division (starts with empty cells) */
function buildStoryGrid(): GridCell[][] {
  const rows = 9;
  const cols = 13;
  const grid: GridCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: GridCell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      row.push({ row: rowIndex, col: colIndex, type: "empty", state: "default" });
    }
    grid.push(row);
  }

  const startCell = grid[1]?.[1];
  if (startCell) startCell.type = "start";
  const endCell = grid[7]?.[11];
  if (endCell) endCell.type = "end";

  return grid;
}

const storyGrid = buildStoryGrid();
const startPosition: [number, number] = [1, 1];
const endPosition: [number, number] = [7, 11];

const steps = generateRecursiveDivisionSteps({
  grid: storyGrid,
  startPosition,
  endPosition,
});

const meta: Meta<typeof GridVisualizer> = {
  title: "Algorithm Pipelines/RecursiveDivision",
  component: GridVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GridVisualizer>;

/** Initial open grid before any walls are added */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GridVisualState,
  },
};

/** Mid-division with walls being built across sub-regions */
export const MidGeneration: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GridVisualState,
  },
};

/** Completed maze — rectangular rooms with single-cell doorways */
export const MazeComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GridVisualState,
  },
};
