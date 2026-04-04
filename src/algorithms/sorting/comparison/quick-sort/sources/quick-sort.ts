// Quick Sort (Lomuto partition) — pick last element as pivot, partition around it, recurse
function quickSortLomuto(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  function partition(arr: number[], lowIndex: number, highIndex: number): number {
    // @step:partition
    const pivotValue = arr[highIndex]!; // @step:partition
    let partitionIndex = lowIndex - 1; // @step:partition

    for (let scanIndex = lowIndex; scanIndex < highIndex; scanIndex++) {
      // @step:compare
      if (arr[scanIndex]! <= pivotValue) {
        // @step:compare
        partitionIndex++; // @step:swap
        const temporaryValue = arr[partitionIndex]!; // @step:swap
        arr[partitionIndex] = arr[scanIndex]!; // @step:swap
        arr[scanIndex] = temporaryValue; // @step:swap
      }
    }

    // Place pivot in its final sorted position
    const temporaryValue = arr[partitionIndex + 1]!; // @step:pivot-placed
    arr[partitionIndex + 1] = arr[highIndex]!; // @step:pivot-placed
    arr[highIndex] = temporaryValue; // @step:pivot-placed

    return partitionIndex + 1; // @step:pivot-placed
  }

  function quickSortRecursive(arr: number[], lowIndex: number, highIndex: number): void {
    // @step:partition
    if (lowIndex >= highIndex) return; // @step:partition

    const pivotFinalIndex = partition(arr, lowIndex, highIndex); // @step:pivot-placed

    quickSortRecursive(arr, lowIndex, pivotFinalIndex - 1); // @step:partition
    quickSortRecursive(arr, pivotFinalIndex + 1, highIndex); // @step:partition
  }

  quickSortRecursive(sortedArray, 0, arrayLength - 1); // @step:partition

  return sortedArray; // @step:complete
}
