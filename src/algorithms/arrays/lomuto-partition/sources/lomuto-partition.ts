// Lomuto Partition — O(n) partition scheme using last element as pivot and a boundary pointer
function lomutoPartition(inputArray: number[]): { pivotIndex: number; result: number[] } {
  if (inputArray.length === 0) {
    // @step:initialize
    return { pivotIndex: -1, result: [] }; // @step:initialize
  }

  const result = [...inputArray]; // @step:initialize
  const pivotOriginalIndex = result.length - 1;
  const pivotValue = result[pivotOriginalIndex]!; // @step:initialize
  let boundaryIndex = 0; // @step:initialize

  for (let scanIndex = 0; scanIndex < pivotOriginalIndex; scanIndex++) {
    // @step:visit
    if (result[scanIndex]! <= pivotValue) {
      // @step:compare
      const tempValue = result[boundaryIndex]!; // @step:swap
      result[boundaryIndex] = result[scanIndex]!; // @step:swap
      result[scanIndex] = tempValue; // @step:swap
      boundaryIndex++; // @step:visit
    }
  }

  // Place pivot into its final sorted position
  const tempValue = result[boundaryIndex]!; // @step:swap
  result[boundaryIndex] = result[pivotOriginalIndex]!; // @step:swap
  result[pivotOriginalIndex] = tempValue; // @step:swap

  return { pivotIndex: boundaryIndex, result }; // @step:complete
}
