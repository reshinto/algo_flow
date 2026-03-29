// Remove Duplicates from Sorted Array — O(n) two-pointer: write pointer tracks unique boundary
function removeDuplicates(sortedArray: number[]): { uniqueCount: number; result: number[] } {
  if (sortedArray.length === 0) {
    // @step:initialize
    return { uniqueCount: 0, result: [] }; // @step:initialize
  }

  const result = [...sortedArray];
  let writePointer = 0; // @step:initialize

  for (let readPointer = 1; readPointer < result.length; readPointer++) {
    if (result[readPointer]! !== result[writePointer]!) {
      // @step:compare
      writePointer++; // @step:swap
      result[writePointer] = result[readPointer]!; // @step:swap
    }
  }

  return { uniqueCount: writePointer + 1, result: result.slice(0, writePointer + 1) }; // @step:complete
}
