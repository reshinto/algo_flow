/** Step generator for Game of Life — produces ExecutionStep[] using MatrixTransformTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixTransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const GAME_OF_LIFE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.GAME_OF_LIFE!);

export interface GameOfLifeInput {
  board: number[][];
}

const NEIGHBOR_DIRECTIONS: [number, number][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function countLiveNeighbors(
  board: number[][],
  rowIdx: number,
  colIdx: number,
  rowCount: number,
  colCount: number,
): number {
  let liveCount = 0;
  for (const [rowDelta, colDelta] of NEIGHBOR_DIRECTIONS) {
    const neighborRow = rowIdx + rowDelta;
    const neighborCol = colIdx + colDelta;
    if (neighborRow >= 0 && neighborRow < rowCount && neighborCol >= 0 && neighborCol < colCount) {
      liveCount += (board[neighborRow]?.[neighborCol] ?? 0) & 1;
    }
  }
  return liveCount;
}

export function generateGameOfLifeSteps(input: GameOfLifeInput): ExecutionStep[] {
  const board = input.board.map((row) => [...row]);
  const rowCount = board.length;
  const colCount = board[0]?.length ?? 0;
  const tracker = new MatrixTransformTracker(board, GAME_OF_LIFE_LINE_MAP);

  tracker.initialize({ rows: rowCount, cols: colCount });

  tracker.setPhase(
    "counting-neighbors",
    { rows: rowCount, cols: colCount, phase: "counting-neighbors" },
    "Phase 1: Count live neighbors for each cell and encode next state into higher bits",
  );

  // Phase 1: Count neighbors and encode next state in bit 1
  for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      const neighborCount = countLiveNeighbors(board, rowIdx, colIdx, rowCount, colCount);
      const currentState = (board[rowIdx]?.[colIdx] ?? 0) & 1;

      let nextState = 0;
      if (currentState === 1 && (neighborCount === 2 || neighborCount === 3)) {
        nextState = 1;
      } else if (currentState === 0 && neighborCount === 3) {
        nextState = 1;
      }

      // Encode next state into bit 1 of the local board copy (for neighbor-reading consistency)
      if (board[rowIdx]) {
        board[rowIdx]![colIdx] = (board[rowIdx]![colIdx] ?? 0) | (nextState << 1);
      }

      const encodedValue = board[rowIdx]?.[colIdx] ?? 0;
      tracker.markCell(
        rowIdx,
        colIdx,
        {
          rowIdx,
          colIdx,
          neighborCount,
          currentState,
          nextState,
          encodedValue,
          phase: "counting-neighbors",
        },
        `[${rowIdx}][${colIdx}]: ${neighborCount} live neighbor${neighborCount === 1 ? "" : "s"} → next=${nextState}`,
      );
    }
  }

  tracker.setPhase(
    "updating",
    { rows: rowCount, cols: colCount, phase: "updating" },
    "Phase 2: Decode final state by right-shifting each cell",
  );

  // Phase 2: Decode final state
  for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      const encodedValue = board[rowIdx]?.[colIdx] ?? 0;
      const finalValue = encodedValue >> 1;

      if (board[rowIdx]) {
        board[rowIdx]![colIdx] = finalValue;
      }

      tracker.flipCell(rowIdx, colIdx, finalValue, {
        rowIdx,
        colIdx,
        encodedValue,
        finalValue,
        phase: "updating",
      });
    }
  }

  tracker.complete({ rows: rowCount, cols: colCount });
  return tracker.getSteps();
}
