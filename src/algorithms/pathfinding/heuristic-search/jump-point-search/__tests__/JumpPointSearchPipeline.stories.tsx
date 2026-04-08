/**
 * Storybook stories for the Jump Point Search pipeline.
 * Uses the real step generator with a small 8x12 grid,
 * rendering the GridVisualizer at key pathfinding states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GridVisualState, GridCell } from "@/types";
import { generateJumpPointSearchSteps } from "../step-generator";
import GridVisualizer from "@/components/visualization/graph/GridVisualizer";

/** Build a small grid with a wall to trigger forced-neighbor jump points */
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

  /* Add a vertical wall barrier to create forced neighbors */
  for (let wallRow = 1; wallRow <= 5; wallRow++) {
    const cell = grid[wallRow]?.[5];
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

const steps = generateJumpPointSearchSteps({ grid: storyGrid, startPosition, endPosition });

const meta: Meta<typeof GridVisualizer> = {
  title: "Algorithm Pipelines/JumpPointSearch",
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

/** Initial grid state before exploration begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GridVisualState,
  },
};

/** Mid-exploration — jump points identified, skipping symmetric paths */
export const MidExploration: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GridVisualState,
  },
};

/** Path found — optimal route highlighted via jump points */
export const PathFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GridVisualState,
  },
};
