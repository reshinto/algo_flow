/**
 * Storybook stories for the Wall Follower pipeline.
 * Uses the real step generator with a small 8x12 grid,
 * rendering the GridVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GridVisualState, GridCell } from "@/types";
import { generateWallFollowerSteps } from "../step-generator";
import GridVisualizer from "@/components/visualization/graph/GridVisualizer";

/** Build a small simply-connected maze for the story demonstration */
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

  /* Add vertical walls to create corridors the wall follower can navigate */
  for (let wallRow = 1; wallRow <= 5; wallRow++) {
    const cell = grid[wallRow]?.[4];
    if (cell) cell.type = "wall";
  }
  for (let wallRow = 2; wallRow <= 6; wallRow++) {
    const cell = grid[wallRow]?.[8];
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

const steps = generateWallFollowerSteps({
  grid: storyGrid,
  startPosition,
  endPosition,
});

const meta: Meta<typeof GridVisualizer> = {
  title: "Algorithm Pipelines/WallFollower",
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

/** Initial grid state before wall-following begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GridVisualState,
  },
};

/** Mid-traversal showing the right-hand rule path along walls */
export const MidTraversal: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GridVisualState,
  },
};

/** Traversal complete — wall-following path from start to end */
export const TraversalComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GridVisualState,
  },
};
