// Perfect Squares tabulation — find minimum number of perfect squares summing to n
function perfectSquares(targetNumber: number): number {
  // @step:initialize
  const dpTable = new Array(targetNumber + 1).fill(Infinity); // @step:initialize,fill-table
  dpTable[0] = 0; // @step:fill-table
  // Fill each cell with the minimum number of perfect squares needed
  for (let cellIndex = 1; cellIndex <= targetNumber; cellIndex++) {
    // @step:compute-cell
    for (let squareRoot = 1; squareRoot * squareRoot <= cellIndex; squareRoot++) {
      // @step:read-cache
      const prevIndex = cellIndex - squareRoot * squareRoot; // @step:read-cache
      if (dpTable[prevIndex] + 1 < dpTable[cellIndex]) {
        // @step:compute-cell
        dpTable[cellIndex] = dpTable[prevIndex] + 1; // @step:compute-cell
      }
    }
  }
  return dpTable[targetNumber]; // @step:complete
}
