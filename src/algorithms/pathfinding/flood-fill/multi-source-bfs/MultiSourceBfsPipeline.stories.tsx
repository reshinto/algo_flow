/**
 * Storybook stories for the Multi-Source BFS pipeline.
 * Uses the real step generator with a small 8x12 grid,
 * rendering the GridVisualizer at key distance-mapping states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GridVisualState, GridCell } from "@/types";
import { generateMultiSourceBfsSteps } from "./step-generator";
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

  /* Add an island wall in the center to create interesting distance gradients */
  for (let wallRow = 2; wallRow <= 5; wallRow++) {
    for (let wallCol = 4; wallCol <= 7; wallCol++) {
      const cell = grid[wallRow]?.[wallCol];
      if (cell) cell.type = "wall";
    }
  }

  /* Mark start and end for context (not used by the algorithm itself) */
  const startCell = grid[1]?.[1];
  if (startCell) startCell.type = "start";
  const endCell = grid[6]?.[10];
  if (endCell) endCell.type = "end";

  return grid;
}

const storyGrid = buildStoryGrid();
const startPosition: [number, number] = [1, 1];
const endPosition: [number, number] = [6, 10];

const steps = generateMultiSourceBfsSteps({
  grid: storyGrid,
  startPosition,
  endPosition,
});

const meta: Meta<typeof GridVisualizer> = {
  title: "Algorithm Pipelines/MultiSourceBfs",
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

/** Initial grid state with all wall-adjacent cells seeded as open */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GridVisualState,
  },
};

/** Mid-propagation with distance values spreading inward from all walls */
export const MidPropagation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GridVisualState,
  },
};

/** Complete — full distance map computed, farthest-from-wall cells at maximum gCost */
export const DistanceMapComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GridVisualState,
  },
};
