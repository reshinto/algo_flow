// Search a 2D Matrix (Binary Search)
// Matrix rows are sorted left-to-right; first integer of each row > last of previous.
// Treat as a virtual 1D sorted array and binary search.
// Time: O(log(m × n)) — single binary search over m×n elements
// Space: O(1) — no auxiliary data structures

function search2DMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0]!.length === 0) return false; // @step:initialize

  const rowCount = matrix.length; // @step:initialize
  const colCount = matrix[0]!.length; // @step:initialize
  let leftIdx = 0; // @step:initialize
  let rightIdx = rowCount * colCount - 1; // @step:initialize

  while (leftIdx <= rightIdx) {
    const midIndex = Math.floor((leftIdx + rightIdx) / 2); // @step:compare-cell
    const midRow = Math.floor(midIndex / colCount); // @step:compare-cell
    const midCol = midIndex % colCount; // @step:compare-cell
    const midValue = matrix[midRow]![midCol]!; // @step:compare-cell

    if (midValue === target) {
      return true; // @step:mark-found
    } else if (midValue < target) {
      leftIdx = midIndex + 1; // @step:compare-cell
    } else {
      rightIdx = midIndex - 1; // @step:compare-cell
    }
  }

  return false; // @step:complete
}
