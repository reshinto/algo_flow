/** Step generator for Eller's Maze — produces ExecutionStep[] using PathfindingTracker. */

import type { ExecutionStep, GridCell } from "@/types";
import { PathfindingTracker } from "@/trackers";
import { ALGORITHM_ID, GRID_DEFAULTS } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ELLERS_MAZE!);

interface MazeInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

export function generateEllersMazeSteps(input: MazeInput): ExecutionStep[] {
  const { grid, startPosition, endPosition } = input;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const tracker = new PathfindingTracker(grid, startPosition, endPosition, LINE_MAP);

  let passagesCarved = 0;

  // Passage column indices (odd columns)
  const passageCols: number[] = [];
  for (let colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
    passageCols.push(colIndex);
  }
  const passageColCount = passageCols.length;

  tracker.initialize({
    startPosition,
    endPosition,
    rowCount,
    colCount,
    passagesCarved,
    passageColCount,
  });

  let nextSetId = 1;
  let currentSets: number[] = Array.from({ length: passageColCount }, () => nextSetId++);

  const passageRows: number[] = [];
  for (let rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
    passageRows.push(rowIndex);
  }

  for (let passageRowPos = 0; passageRowPos < passageRows.length; passageRowPos++) {
    const passageRow = passageRows[passageRowPos]!;
    const isLastRow = passageRowPos === passageRows.length - 1;

    tracker.setPhase(`Row ${passageRow}`);

    // Step 1: Carve all passage cells in this row
    for (const passageCol of passageCols) {
      passagesCarved++;
      tracker.carveCell(passageRow, passageCol, {
        passageRow,
        passageCol,
        row: passageRowPos,
        passagesCarved,
      });
    }

    // Step 2: Randomly merge adjacent cells in different sets
    for (let cellPos = 0; cellPos < passageColCount - 1; cellPos++) {
      const leftSetId = currentSets[cellPos]!;
      const rightSetId = currentSets[cellPos + 1]!;
      const wallCol = passageCols[cellPos]! + 1;

      const shouldMerge = leftSetId !== rightSetId && (isLastRow ? true : Math.random() < 0.5);

      if (shouldMerge) {
        passagesCarved++;
        tracker.mergeCells(
          passageRow,
          wallCol,
          {
            leftSet: leftSetId,
            rightSet: rightSetId,
            wallCol,
            passageRow,
            passagesCarved,
          },
          `Merge sets ${leftSetId} and ${rightSetId} at row ${passageRow}`,
        );

        for (let updatePos = 0; updatePos < passageColCount; updatePos++) {
          if (currentSets[updatePos] === rightSetId) {
            currentSets[updatePos] = leftSetId;
          }
        }
      }
    }

    if (isLastRow) break;

    // Step 3: Extend cells downward into next row
    const nextRow = passageRows[passageRowPos + 1]!;

    const setGroups: Map<number, number[]> = new Map();
    for (let cellPos = 0; cellPos < passageColCount; cellPos++) {
      const setId = currentSets[cellPos]!;
      const existing = setGroups.get(setId) ?? [];
      existing.push(cellPos);
      setGroups.set(setId, existing);
    }

    const nextSets: number[] = new Array(passageColCount).fill(0);

    for (const [setId, positions] of setGroups) {
      const shuffled = [...positions].sort(() => Math.random() - 0.5);
      const extensionCount = Math.max(1, Math.floor(Math.random() * positions.length) + 1);

      for (let extIndex = 0; extIndex < shuffled.length; extIndex++) {
        const cellPos = shuffled[extIndex]!;
        const passageCol = passageCols[cellPos]!;
        const betweenRow = passageRow + 1;

        if (extIndex < extensionCount) {
          passagesCarved++;
          tracker.carveCell(betweenRow, passageCol, {
            setId,
            betweenRow,
            passageCol,
            extensionIndex: extIndex,
            passagesCarved,
          });
          nextSets[cellPos] = setId;
        } else {
          nextSets[cellPos] = nextSetId++;
        }
      }
    }

    // Carve next row passage cells
    for (const passageCol of passageCols) {
      passagesCarved++;
      tracker.carveCell(nextRow, passageCol, {
        nextRow,
        passageCol,
        passagesCarved,
      });
    }

    currentSets = nextSets;
  }

  tracker.complete(
    { passagesCarved, description: `Maze generation complete: ${passagesCarved} passages carved` },
    false,
  );

  return tracker.getSteps();
}

/** Build an all-walls grid with start and end marked for maze generation. */
export function createMazeDefaultGrid(): GridCell[][] {
  const { rows, cols, startPosition, endPosition } = GRID_DEFAULTS;
  const grid: GridCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: GridCell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      let cellType: GridCell["type"] = "wall";
      if (rowIndex === startPosition[0] && colIndex === startPosition[1]) {
        cellType = "start";
      } else if (rowIndex === endPosition[0] && colIndex === endPosition[1]) {
        cellType = "end";
      }
      row.push({
        row: rowIndex,
        col: colIndex,
        type: cellType,
        state: "default",
      });
    }
    grid.push(row);
  }

  return grid;
}
