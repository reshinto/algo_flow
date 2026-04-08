/**
 * Storybook stories for the Binary Tree Maze pipeline.
 * Uses the real step generator with a small all-walls grid,
 * rendering the GridVisualizer at key maze generation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GridVisualState, GridCell } from "@/types";
import { generateBinaryTreeMazeSteps } from "./step-generator";
import GridVisualizer from "@/components/visualization/graph/GridVisualizer";

/** Build a small all-walls grid for the Binary Tree maze story */
function buildStoryGrid(): GridCell[][] {
  const rows = 9;
  const cols = 13;
  const grid: GridCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: GridCell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      row.push({ row: rowIndex, col: colIndex, type: "wall", state: "default" });
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

const steps = generateBinaryTreeMazeSteps({
  grid: storyGrid,
  startPosition,
  endPosition,
});

const meta: Meta<typeof GridVisualizer> = {
  title: "Algorithm Pipelines/BinaryTreeMaze",
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

/** Initial all-walls grid before binary tree scan begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GridVisualState,
  },
};

/** Mid-generation with top-left region carved showing diagonal bias */
export const MidGeneration: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GridVisualState,
  },
};

/** Completed maze — visible diagonal bias with open top row and right column */
export const MazeComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GridVisualState,
  },
};
