/**
 * Storybook stories for the Iterative Deepening DFS pipeline.
 * Uses the real step generator with a small 5x7 grid,
 * rendering the GridVisualizer at key exploration states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GridVisualState, GridCell } from "@/types";
import { generateIterativeDeepeningDfsSteps } from "../step-generator";
import GridVisualizer from "@/components/visualization/graph/GridVisualizer";

/** Build a small grid with walls for the story demonstration */
function buildStoryGrid(): GridCell[][] {
  const rows = 5;
  const cols = 7;
  const grid: GridCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: GridCell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      row.push({ row: rowIndex, col: colIndex, type: "empty", state: "default" });
    }
    grid.push(row);
  }

  /* Add a small wall barrier */
  const wallCells: [number, number][] = [
    [1, 3],
    [2, 3],
    [3, 3],
  ];
  for (const [wallRow, wallCol] of wallCells) {
    const cell = grid[wallRow]?.[wallCol];
    if (cell) cell.type = "wall";
  }

  /* Mark start and end positions */
  const startCell = grid[1]?.[1];
  if (startCell) startCell.type = "start";
  const endCell = grid[3]?.[5];
  if (endCell) endCell.type = "end";

  return grid;
}

const storyGrid = buildStoryGrid();
const startPosition: [number, number] = [1, 1];
const endPosition: [number, number] = [3, 5];

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
