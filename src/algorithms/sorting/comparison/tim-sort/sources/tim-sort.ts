// Tim Sort — hybrid of insertion sort for small runs + merge sort to combine them
const MIN_RUN_SIZE = 4;

function insertionSortRun(sortedArray: number[], runStart: number, runEnd: number): void {
  // @step:insertion-pass
  for (let outerIndex = runStart + 1; outerIndex <= runEnd; outerIndex++) {
    // @step:insertion-pass
    const currentValue = sortedArray[outerIndex]!; // @step:insertion-pass
    let innerIndex = outerIndex - 1; // @step:insertion-pass

    while (innerIndex >= runStart && sortedArray[innerIndex]! > currentValue) {
      // @step:compare
      sortedArray[innerIndex + 1] = sortedArray[innerIndex]!; // @step:swap
      innerIndex--; // @step:swap
    }
    sortedArray[innerIndex + 1] = currentValue; // @step:swap
  }
}

function mergeRuns(
  sortedArray: number[],
  leftStart: number,
  midPoint: number,
  rightEnd: number,
): void {
  // @step:merge
  const leftSlice = sortedArray.slice(leftStart, midPoint + 1); // @step:merge
  const rightSlice = sortedArray.slice(midPoint + 1, rightEnd + 1); // @step:merge

  let leftPointer = 0; // @step:merge
  let rightPointer = 0; // @step:merge
  let mergeIndex = leftStart; // @step:merge

  while (leftPointer < leftSlice.length && rightPointer < rightSlice.length) {
    // @step:compare
    if (leftSlice[leftPointer]! <= rightSlice[rightPointer]!) {
      // @step:compare
      sortedArray[mergeIndex] = leftSlice[leftPointer]!; // @step:merge
      leftPointer++; // @step:merge
    } else {
      sortedArray[mergeIndex] = rightSlice[rightPointer]!; // @step:merge
      rightPointer++; // @step:merge
    }
    mergeIndex++; // @step:merge
  }

  while (leftPointer < leftSlice.length) {
    sortedArray[mergeIndex] = leftSlice[leftPointer]!; // @step:merge
    leftPointer++; // @step:merge
    mergeIndex++; // @step:merge
  }

  while (rightPointer < rightSlice.length) {
    sortedArray[mergeIndex] = rightSlice[rightPointer]!; // @step:merge
    rightPointer++; // @step:merge
    mergeIndex++; // @step:merge
  }
}

function timSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  // Sort individual runs using insertion sort
  for (let runStart = 0; runStart < arrayLength; runStart += MIN_RUN_SIZE) {
    // @step:insertion-pass
    const runEnd = Math.min(runStart + MIN_RUN_SIZE - 1, arrayLength - 1); // @step:insertion-pass
    insertionSortRun(sortedArray, runStart, runEnd); // @step:insertion-pass
  }

  // Merge sorted runs in increasing size
  for (let mergeSize = MIN_RUN_SIZE; mergeSize < arrayLength; mergeSize *= 2) {
    // @step:merge
    for (let leftStart = 0; leftStart < arrayLength; leftStart += 2 * mergeSize) {
      // @step:merge
      const midPoint = Math.min(leftStart + mergeSize - 1, arrayLength - 1); // @step:merge
      const rightEnd = Math.min(leftStart + 2 * mergeSize - 1, arrayLength - 1); // @step:merge

      if (midPoint < rightEnd) {
        mergeRuns(sortedArray, leftStart, midPoint, rightEnd); // @step:merge
      }
    }
  }

  // @step:mark-sorted
  return sortedArray; // @step:complete
}
