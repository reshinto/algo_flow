/** Step generator for Valid Sudoku — produces ExecutionStep[] using MatrixConstructionTracker. */

import type { ExecutionStep } from "@/types";
import { MatrixConstructionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const VALID_SUDOKU_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.VALID_SUDOKU!);

export interface ValidSudokuInput {
  board: number[][];
}

export function generateValidSudokuSteps(input: ValidSudokuInput): ExecutionStep[] {
  const { board } = input;
  const tracker = MatrixConstructionTracker.fromMatrix(board, VALID_SUDOKU_LINE_MAP);

  tracker.initialize({
    rows: board.length,
    cols: board[0]?.length ?? 0,
    description: "Initialize row, column, and box seen-digit sets",
  });

  const rowsSeen: Set<number>[] = Array.from({ length: 9 }, () => new Set<number>());
  const colsSeen: Set<number>[] = Array.from({ length: 9 }, () => new Set<number>());
  const boxesSeen: Set<number>[] = Array.from({ length: 9 }, () => new Set<number>());

  for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
    for (let colIdx = 0; colIdx < 9; colIdx++) {
      const digitValue = board[rowIdx]?.[colIdx] ?? 0;

      if (digitValue === 0) continue;

      const boxIdx = Math.floor(rowIdx / 3) * 3 + Math.floor(colIdx / 3);
      const boxRow = Math.floor(rowIdx / 3);
      const boxCol = Math.floor(colIdx / 3);

      const rowDuplicate = rowsSeen[rowIdx]!.has(digitValue);
      const colDuplicate = colsSeen[colIdx]!.has(digitValue);
      const boxDuplicate = boxesSeen[boxIdx]!.has(digitValue);

      if (rowDuplicate || colDuplicate || boxDuplicate) {
        const duplicateLocation = rowDuplicate
          ? `row ${rowIdx}`
          : colDuplicate
            ? `column ${colIdx}`
            : `box (${boxRow},${boxCol})`;
        tracker.verifyCell(
          rowIdx,
          colIdx,
          {
            rowIdx,
            colIdx,
            digitValue,
            boxIdx,
            rowsSeen: [...rowsSeen[rowIdx]!],
            colsSeen: [...colsSeen[colIdx]!],
          },
          false,
          `Duplicate! ${digitValue} already seen in ${duplicateLocation} — board is invalid`,
        );
        tracker.complete({ valid: false });
        return tracker.getSteps();
      }

      rowsSeen[rowIdx]!.add(digitValue);
      colsSeen[colIdx]!.add(digitValue);
      boxesSeen[boxIdx]!.add(digitValue);

      tracker.verifyCell(
        rowIdx,
        colIdx,
        {
          rowIdx,
          colIdx,
          digitValue,
          boxIdx,
          rowsSeen: [...rowsSeen[rowIdx]!],
          colsSeen: [...colsSeen[colIdx]!],
        },
        true,
        `${digitValue} at [${rowIdx}][${colIdx}] — valid in row ${rowIdx}, col ${colIdx}, box (${boxRow},${boxCol})`,
      );
    }
  }

  tracker.complete({ valid: true });
  return tracker.getSteps();
}
