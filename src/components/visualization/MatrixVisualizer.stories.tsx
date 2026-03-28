/** Storybook stories for the MatrixVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState, MatrixCell } from "@/types";
import MatrixVisualizer from "./MatrixVisualizer";

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Visualization/MatrixVisualizer",
  component: MatrixVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MatrixVisualizer>;

const rawValues = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

function buildCells(
  stateOverrides?: (row: number, col: number) => MatrixCell["state"],
): MatrixCell[][] {
  return rawValues.map((row, rowIdx) =>
    row.map((value, colIdx) => ({
      row: rowIdx,
      col: colIdx,
      value,
      state: stateOverrides ? stateOverrides(rowIdx, colIdx) : "default",
    })),
  );
}

export const Default: Story = {
  args: {
    visualState: {
      kind: "matrix",
      cells: buildCells(),
      collectedOrder: [],
      currentPosition: null,
      direction: null,
      boundaries: { top: 0, bottom: 2, left: 0, right: 3 },
    } satisfies MatrixVisualState,
  },
};

export const TraversingRight: Story = {
  args: {
    visualState: {
      kind: "matrix",
      cells: buildCells((row, col) => {
        if (row === 0 && col < 2) return "collected";
        if (row === 0 && col === 2) return "current";
        return "default";
      }),
      collectedOrder: [1, 2],
      currentPosition: [0, 2],
      direction: "right",
      boundaries: { top: 0, bottom: 2, left: 0, right: 3 },
    } satisfies MatrixVisualState,
  },
};

export const ShrunkBoundaries: Story = {
  args: {
    visualState: {
      kind: "matrix",
      cells: buildCells((row, col) => {
        if (row === 0 || row === 2 || (col === 0 && row <= 2) || (col === 3 && row <= 2))
          return "collected";
        if (row === 1 && col === 2) return "current";
        return "default";
      }),
      collectedOrder: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6],
      currentPosition: [1, 2],
      direction: "right",
      boundaries: { top: 1, bottom: 1, left: 1, right: 2 },
    } satisfies MatrixVisualState,
  },
};

export const Completed: Story = {
  args: {
    visualState: {
      kind: "matrix",
      cells: buildCells(() => "collected"),
      collectedOrder: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
      currentPosition: null,
      direction: null,
      boundaries: { top: 1, bottom: 0, left: 2, right: 1 },
    } satisfies MatrixVisualState,
  },
};
