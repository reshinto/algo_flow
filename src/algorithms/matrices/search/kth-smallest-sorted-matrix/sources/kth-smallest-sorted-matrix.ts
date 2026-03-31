// Kth Smallest Element in Sorted Matrix
// Given an n×n matrix where each row and column is sorted in ascending order,
// find the kth smallest element using binary search on the value range.
// Time: O(n × log(max − min)) — n staircase steps per binary search iteration
// Space: O(1) — no auxiliary data structures needed

function kthSmallestSortedMatrix(matrix: number[][], targetK: number): number {
  const matrixSize = matrix.length;
  let leftVal = matrix[0]![0]!; // @step:initialize
  let rightVal = matrix[matrixSize - 1]![matrixSize - 1]!; // @step:initialize

  while (leftVal < rightVal) {
    const midVal = leftVal + Math.floor((rightVal - leftVal) / 2); // @step:compare-cell

    // Count elements <= midVal using staircase from bottom-left
    let elementCount = 0; // @step:compare-cell
    let currentRow = matrixSize - 1; // @step:compare-cell
    let currentCol = 0; // @step:compare-cell

    while (currentRow >= 0 && currentCol < matrixSize) {
      if (matrix[currentRow]![currentCol]! <= midVal) {
        elementCount += currentRow + 1; // @step:compare-cell
        currentCol++;
      } else {
        currentRow--; // @step:compare-cell
      }
    }

    if (elementCount < targetK) {
      leftVal = midVal + 1; // @step:compare-cell
    } else {
      rightVal = midVal; // @step:compare-cell
    }
  }

  return leftVal; // @step:mark-found
} // @step:complete
