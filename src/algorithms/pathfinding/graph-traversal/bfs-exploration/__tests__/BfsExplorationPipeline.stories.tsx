/**
 * Storybook stories for the BFS Exploration pipeline.
 * Uses the real step generator with a small 8x12 grid,
 * rendering the GridVisualizer at key exploration states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GridVisualState, GridCell } from "@/types";
import { generateBfsExplorationSteps } from "../step-generator";
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

  /* Add a vertical wall barrier */
  for (let wallRow = 1; wallRow <= 5; wallRow++) {
    const cell = grid[wallRow]?.[4];
    if (cell) cell.type = "wall";
  }

  /* Mark start position */
  const startCell = grid[1]?.[1];
  if (startCell) startCell.type = "start";

  return grid;
}

const storyGrid = buildStoryGrid();
const startPosition: [number, number] = [1, 1];

const steps = generateBfsExplorationSteps({
  grid: storyGrid,
  startPosition,
  endPosition: startPosition,
});

const meta: Meta<typeof GridVisualizer> = {
  title: "Algorithm Pipelines/BfsExploration",
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

/** Mid-exploration with open and closed cells radiating from start */
export const MidExploration: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GridVisualState,
  },
};

/** Exploration complete — all reachable cells visited */
export const ExplorationComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GridVisualState,
  },
};
