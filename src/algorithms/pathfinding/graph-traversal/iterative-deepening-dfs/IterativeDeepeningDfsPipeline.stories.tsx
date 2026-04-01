/**
 * Storybook stories for the Iterative Deepening DFS pipeline.
 * Uses the real step generator with a small 8x12 grid,
 * rendering the GridVisualizer at key exploration states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GridVisualState, GridCell } from "@/types";
import { generateIterativeDeepeningDfsSteps } from "./step-generator";
import GridVisualizer from "@/components/visualization/GridVisualizer";

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

  /* Add a vertical wall barrier */
  for (let wallRow = 1; wallRow <= 5; wallRow++) {
    const cell = grid[wallRow]?.[4];
    if (cell) cell.type = "wall";
  }

  /* Mark start and end positions */
  const startCell = grid[1]?.[1];
  if (startCell) startCell.type = "start";
  const endCell = grid[6]?.[10];
  if (endCell) endCell.type = "end";

  return grid;
}

const storyGrid = buildStoryGrid();
const startPosition: [number, number] = [1, 1];
const endPosition: [number, number] = [6, 10];

const steps = generateIterativeDeepeningDfsSteps({
  grid: storyGrid,
  startPosition,
  endPosition,
});

const meta: Meta<typeof GridVisualizer> = {
  title: "Algorithm Pipelines/IterativeDeepeningDfs",
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

/** Initial grid state before any depth iteration begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GridVisualState,
  },
};

/** Mid-exploration showing depth-limited search in progress */
export const MidExploration: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GridVisualState,
  },
};

/** Path found — shortest path highlighted after optimal depth was reached */
export const PathFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GridVisualState,
  },
};
