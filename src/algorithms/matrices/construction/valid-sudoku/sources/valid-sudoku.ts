// Valid Sudoku (LeetCode 36)
// Determine if a 9×9 Sudoku board is valid.
// Each row, column, and 3×3 sub-box must contain no duplicate digits 1-9.
// Empty cells are represented by 0.
// Time: O(1) — fixed 9×9 board
// Space: O(1) — fixed-size sets

function validSudoku(board: number[][]): boolean {
  const rowsSeen: Set<number>[] = Array.from({ length: 9 }, () => new Set()); // @step:initialize
  const colsSeen: Set<number>[] = Array.from({ length: 9 }, () => new Set()); // @step:initialize
  const boxesSeen: Set<number>[] = Array.from({ length: 9 }, () => new Set()); // @step:initialize

  for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
    for (let colIdx = 0; colIdx < 9; colIdx++) {
      const digitValue = board[rowIdx]![colIdx]!; // @step:compare-cell

      if (digitValue === 0) continue; // @step:compare-cell

      const boxIdx = Math.floor(rowIdx / 3) * 3 + Math.floor(colIdx / 3); // @step:compare-cell

      if (
        rowsSeen[rowIdx]!.has(digitValue) ||
        colsSeen[colIdx]!.has(digitValue) ||
        boxesSeen[boxIdx]!.has(digitValue)
      ) {
        return false; // @step:mark-found
      }

      rowsSeen[rowIdx]!.add(digitValue); // @step:compare-cell
      colsSeen[colIdx]!.add(digitValue); // @step:compare-cell
      boxesSeen[boxIdx]!.add(digitValue); // @step:compare-cell
    }
  }

  return true; // @step:complete
}
