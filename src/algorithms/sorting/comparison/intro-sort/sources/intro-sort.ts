// Intro Sort — starts with Quick Sort, falls back to Heap Sort when depth limit exceeded,
// uses Insertion Sort for small partitions
const INSERTION_SORT_THRESHOLD = 16;

function insertionSortSlice(sortedArray: number[], sliceStart: number, sliceEnd: number): void {
  // @step:insertion-pass
  for (let outerIndex = sliceStart + 1; outerIndex <= sliceEnd; outerIndex++) {
    // @step:insertion-pass
    const currentValue = sortedArray[outerIndex]!; // @step:insertion-pass
    let innerIndex = outerIndex - 1; // @step:insertion-pass

    while (innerIndex >= sliceStart && sortedArray[innerIndex]! > currentValue) {
      // @step:compare
      sortedArray[innerIndex + 1] = sortedArray[innerIndex]!; // @step:swap
      innerIndex--; // @step:swap
    }
    sortedArray[innerIndex + 1] = currentValue; // @step:swap
  }
}

function heapify(sortedArray: number[], heapSize: number, rootIndex: number): void {
  // @step:heapify
  let largestIndex = rootIndex; // @step:heapify
  const leftChild = 2 * rootIndex + 1; // @step:heapify
  const rightChild = 2 * rootIndex + 2; // @step:heapify

  if (leftChild < heapSize && sortedArray[leftChild]! > sortedArray[largestIndex]!) {
    // @step:compare
    largestIndex = leftChild; // @step:heapify
  }
  if (rightChild < heapSize && sortedArray[rightChild]! > sortedArray[largestIndex]!) {
    // @step:compare
    largestIndex = rightChild; // @step:heapify
  }

  if (largestIndex !== rootIndex) {
    // @step:swap
    const temporaryValue = sortedArray[rootIndex]!; // @step:swap
    sortedArray[rootIndex] = sortedArray[largestIndex]!; // @step:swap
    sortedArray[largestIndex] = temporaryValue; // @step:swap
    heapify(sortedArray, heapSize, largestIndex); // @step:heapify
  }
}

function heapSort(sortedArray: number[], sliceStart: number, sliceEnd: number): void {
  // @step:heapify
  const sliceLength = sliceEnd - sliceStart + 1; // @step:heapify

  // Build max heap over the slice
  for (let buildIndex = Math.floor(sliceLength / 2) - 1; buildIndex >= 0; buildIndex--) {
    // @step:heapify
    heapify(sortedArray, sliceLength, buildIndex); // @step:heapify
  }

  // Extract elements one by one
  for (let extractIndex = sliceLength - 1; extractIndex > 0; extractIndex--) {
    // @step:swap
    const temporaryValue = sortedArray[sliceStart]!; // @step:swap
    sortedArray[sliceStart] = sortedArray[sliceStart + extractIndex]!; // @step:swap
    sortedArray[sliceStart + extractIndex] = temporaryValue; // @step:swap
    heapify(sortedArray, extractIndex, 0); // @step:heapify
  }
}

function lomutoPartition(
  sortedArray: number[],
  partitionStart: number,
  partitionEnd: number,
): number {
  // @step:partition
  const pivotValue = sortedArray[partitionEnd]!; // @step:partition
  let partitionIndex = partitionStart - 1; // @step:partition

  for (let scanIndex = partitionStart; scanIndex < partitionEnd; scanIndex++) {
    // @step:compare
    if (sortedArray[scanIndex]! <= pivotValue) {
      // @step:compare
      partitionIndex++; // @step:swap
      const temporaryValue = sortedArray[partitionIndex]!; // @step:swap
      sortedArray[partitionIndex] = sortedArray[scanIndex]!; // @step:swap
      sortedArray[scanIndex] = temporaryValue; // @step:swap
    }
  }

  const temporaryValue = sortedArray[partitionIndex + 1]!; // @step:swap
  sortedArray[partitionIndex + 1] = sortedArray[partitionEnd]!; // @step:swap
  sortedArray[partitionEnd] = temporaryValue; // @step:swap
  return partitionIndex + 1; // @step:partition
}

function introSortRecurse(
  sortedArray: number[],
  rangeStart: number,
  rangeEnd: number,
  depthLimit: number,
): void {
  const rangeSize = rangeEnd - rangeStart + 1;

  if (rangeSize <= INSERTION_SORT_THRESHOLD) {
    // @step:insertion-pass
    insertionSortSlice(sortedArray, rangeStart, rangeEnd); // @step:insertion-pass
    return;
  }

  if (depthLimit === 0) {
    // @step:heapify
    heapSort(sortedArray, rangeStart, rangeEnd); // @step:heapify
    return;
  }

  const pivotIndex = lomutoPartition(sortedArray, rangeStart, rangeEnd); // @step:partition
  introSortRecurse(sortedArray, rangeStart, pivotIndex - 1, depthLimit - 1); // @step:partition
  introSortRecurse(sortedArray, pivotIndex + 1, rangeEnd, depthLimit - 1); // @step:partition
}

function introSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  if (arrayLength <= 1) {
    return sortedArray; // @step:complete
  }

  const depthLimit = 2 * Math.floor(Math.log2(arrayLength)); // @step:initialize
  introSortRecurse(sortedArray, 0, arrayLength - 1, depthLimit); // @step:partition

  // @step:mark-sorted
  return sortedArray; // @step:complete
}
