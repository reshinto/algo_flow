/**
 * Storybook stories for the Flood Fill DFS pipeline.
 * Uses the real step generator with a small 8x12 grid,
 * rendering the GridVisualizer at key flood fill states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GridVisualState, GridCell } from "@/types";
import { generateFloodFillDfsSteps } from "./step-generator";
import GridVisualizer from "@/components/visualization/graph/GridVisualizer";

/** Build a small grid with walls for the story demonstration */
function buildStoryGrid(): GridCell[][] {
  const rows = 8;
  const cols = 12;
  const grid: GridCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: GridCell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      row.push({ row: rowIndex, col: colIndex, type: "empty", state: "default" });
    }
    grid.push(row);
  }

  /* Add a T-shaped wall barrier to create interesting DFS traversal */
  for (let wallRow = 0; wallRow <= 4; wallRow++) {
    const cell = grid[wallRow]?.[6];
    if (cell) cell.type = "wall";
  }
  for (let wallCol = 3; wallCol <= 9; wallCol++) {
    const cell = grid[4]?.[wallCol];
    if (cell) cell.type = "wall";
  }

  /* Mark start position */
  const startCell = grid[1]?.[1];
  if (startCell) startCell.type = "start";
  const endCell = grid[6]?.[10];
  if (endCell) endCell.type = "end";

  return grid;
}

const storyGrid = buildStoryGrid();
const startPosition: [number, number] = [1, 1];
const endPosition: [number, number] = [6, 10];

const steps = generateFloodFillDfsSteps({
  grid: storyGrid,
  startPosition,
  endPosition,
});

const meta: Meta<typeof GridVisualizer> = {
  title: "Algorithm Pipelines/FloodFillDfs",
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

/** Initial grid state before flood fill begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GridVisualState,
  },
};

/** Mid-fill with DFS winding trail visible */
export const MidFill: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GridVisualState,
  },
};

/** Fill complete — all reachable cells visited */
export const FillComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GridVisualState,
  },
};
