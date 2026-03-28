// Quickselect — O(n) average via Lomuto partition, recurse only on relevant half
function quickselect(
  inputArray: number[],
  targetK: number,
): { kthElement: number; pivotIndex: number } {
  if (inputArray.length === 0 || targetK < 1 || targetK > inputArray.length) {
    // @step:initialize
    return { kthElement: -1, pivotIndex: -1 }; // @step:initialize
  }

  const workArray = [...inputArray]; // @step:initialize
  const targetIndex = targetK - 1; // @step:initialize (0-based index for kth smallest)

  function lomutoPartition(array: number[], rangeStart: number, rangeEnd: number): number {
    const pivotValue = array[rangeEnd]!; // @step:compare
    let boundaryIndex = rangeStart;

    for (let scanIndex = rangeStart; scanIndex < rangeEnd; scanIndex++) {
      if (array[scanIndex]! <= pivotValue) {
        // @step:compare
        const tempValue = array[boundaryIndex]!; // @step:swap
        array[boundaryIndex] = array[scanIndex]!; // @step:swap
        array[scanIndex] = tempValue; // @step:swap
        boundaryIndex++;
      }
    }

    const tempValue = array[boundaryIndex]!; // @step:swap
    array[boundaryIndex] = array[rangeEnd]!; // @step:swap
    array[rangeEnd] = tempValue; // @step:swap
    return boundaryIndex;
  }

  function selectKth(
    array: number[],
    rangeStart: number,
    rangeEnd: number,
    targetPosition: number,
  ): number {
    if (rangeStart === rangeEnd) {
      // @step:compare
      return array[rangeStart]!; // @step:compare
    }

    const pivotFinalIndex = lomutoPartition(array, rangeStart, rangeEnd); // @step:compare

    if (pivotFinalIndex === targetPosition) {
      // @step:compare
      return array[pivotFinalIndex]!; // @step:compare
    } else if (targetPosition < pivotFinalIndex) {
      return selectKth(array, rangeStart, pivotFinalIndex - 1, targetPosition); // @step:compare
    } else {
      return selectKth(array, pivotFinalIndex + 1, rangeEnd, targetPosition); // @step:compare
    }
  }

  const kthElement = selectKth(workArray, 0, workArray.length - 1, targetIndex);

  // Find where kth element ended up after partitioning
  const pivotIndex = workArray.indexOf(kthElement);

  return { kthElement, pivotIndex }; // @step:complete
}
