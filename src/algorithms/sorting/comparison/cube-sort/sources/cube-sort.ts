// Cube Sort — divide into cube-root-sized blocks, sort each, then merge all blocks together
function cubeSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  if (arrayLength <= 1) return sortedArray; // @step:initialize

  // Compute block size as cube root of array length (minimum 1)
  const blockSize = Math.max(1, Math.ceil(Math.cbrt(arrayLength))); // @step:initialize

  // Phase 1: Insertion sort each block
  const blockCount = Math.ceil(arrayLength / blockSize);
  for (let blockIndex = 0; blockIndex < blockCount; blockIndex++) {
    // @step:divide-block
    const blockStart = blockIndex * blockSize; // @step:divide-block
    const blockEnd = Math.min(blockStart + blockSize, arrayLength); // @step:divide-block

    // Insertion sort within this block
    for (let outerIndex = blockStart + 1; outerIndex < blockEnd; outerIndex++) {
      const currentValue = sortedArray[outerIndex]!; // @step:compare
      let innerIndex = outerIndex - 1;

      while (innerIndex >= blockStart && sortedArray[innerIndex]! > currentValue) {
        // @step:swap
        sortedArray[innerIndex + 1] = sortedArray[innerIndex]!; // @step:swap
        innerIndex--;
      }
      sortedArray[innerIndex + 1] = currentValue; // @step:swap
    }
  }

  // Phase 2: Merge all sorted blocks using a k-way merge into a temporary array
  const resultArray: number[] = new Array(arrayLength) as number[];
  // Track the current position within each block
  const blockPointers: number[] = [];
  for (let blockIndex = 0; blockIndex < blockCount; blockIndex++) {
    blockPointers.push(blockIndex * blockSize);
  }

  for (let resultIndex = 0; resultIndex < arrayLength; resultIndex++) {
    // @step:merge-blocks
    let minimumValue = Infinity;
    let minimumBlock = -1;

    for (let blockIndex = 0; blockIndex < blockCount; blockIndex++) {
      const pointer = blockPointers[blockIndex]!;
      const blockEnd = Math.min((blockIndex + 1) * blockSize, arrayLength);

      if (pointer < blockEnd) {
        // @step:compare
        if (sortedArray[pointer]! < minimumValue) {
          // @step:compare
          minimumValue = sortedArray[pointer]!;
          minimumBlock = blockIndex;
        }
      }
    }

    resultArray[resultIndex] = minimumValue; // @step:merge-blocks
    blockPointers[minimumBlock] = (blockPointers[minimumBlock] ?? 0) + 1; // @step:merge-blocks
  }

  // Copy result back
  for (let copyIndex = 0; copyIndex < arrayLength; copyIndex++) {
    sortedArray[copyIndex] = resultArray[copyIndex]!; // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
