/** Storybook stories for the GridVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { GridVisualState, GridCell } from "@/types";
import GridVisualizer from "./GridVisualizer";

const meta: Meta<typeof GridVisualizer> = {
  title: "Visualization/GridVisualizer",
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

function createGrid(rows: number, cols: number): GridCell[][] {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      type: "empty" as const,
      state: "default" as const,
    })),
  );
}

const smallGrid = createGrid(8, 12);
/* Add walls */
for (let wallRow = 1; wallRow <= 5; wallRow++) {
  const cell = smallGrid[wallRow]?.[4];
  if (cell) cell.type = "wall";
}
/* Set start and end */
const startCell = smallGrid[1]?.[1];
if (startCell) startCell.type = "start";
const endCell = smallGrid[6]?.[10];
if (endCell) endCell.type = "end";

export const EmptyGrid: Story = {
  args: {
    visualState: {
      kind: "grid",
      cells: smallGrid,
      startPosition: [1, 1],
      endPosition: [6, 10],
      currentPath: [],
    } satisfies GridVisualState,
  },
};

/* Grid with exploration in progress */
const exploringGrid = createGrid(8, 12);
for (let wallRow = 1; wallRow <= 5; wallRow++) {
  const eCell = exploringGrid[wallRow]?.[4];
  if (eCell) eCell.type = "wall";
}
const eStartCell = exploringGrid[1]?.[1];
if (eStartCell) eStartCell.type = "start";
const eEndCell = exploringGrid[6]?.[10];
if (eEndCell) eEndCell.type = "end";

/* Mark some cells as open/closed */
const closedPositions: [number, number][] = [
  [1, 1],
  [1, 2],
  [1, 3],
  [2, 1],
  [2, 2],
  [2, 3],
  [3, 1],
  [3, 2],
  [3, 3],
];
const openPositions: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [4, 1],
  [4, 2],
  [4, 3],
  [1, 0],
  [2, 0],
  [3, 0],
];
for (const [closedRow, closedCol] of closedPositions) {
  const cell = exploringGrid[closedRow]?.[closedCol];
  if (cell) cell.state = "closed";
}
for (const [openRow, openCol] of openPositions) {
  const cell = exploringGrid[openRow]?.[openCol];
  if (cell) cell.state = "open";
}

export const Exploring: Story = {
  args: {
    visualState: {
      kind: "grid",
      cells: exploringGrid,
      startPosition: [1, 1],
      endPosition: [6, 10],
      currentPath: [],
    } satisfies GridVisualState,
  },
};

/* Grid with completed path */
const completedGrid = createGrid(8, 12);
for (let wallRow = 1; wallRow <= 5; wallRow++) {
  const cCell = completedGrid[wallRow]?.[4];
  if (cCell) cCell.type = "wall";
}
const cStartCell = completedGrid[1]?.[1];
if (cStartCell) cStartCell.type = "start";
const cEndCell = completedGrid[6]?.[10];
if (cEndCell) cEndCell.type = "end";

const pathPositions: [number, number][] = [
  [1, 1],
  [1, 2],
  [1, 3],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [5, 5],
  [6, 5],
  [6, 6],
  [6, 7],
  [6, 8],
  [6, 9],
  [6, 10],
];
for (const [pathRow, pathCol] of pathPositions) {
  const cell = completedGrid[pathRow]?.[pathCol];
  if (cell) cell.state = "path";
}

export const PathFound: Story = {
  args: {
    visualState: {
      kind: "grid",
      cells: completedGrid,
      startPosition: [1, 1],
      endPosition: [6, 10],
      currentPath: pathPositions,
    } satisfies GridVisualState,
  },
};
