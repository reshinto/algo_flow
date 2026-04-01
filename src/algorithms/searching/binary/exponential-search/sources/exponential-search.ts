// Exponential Search — probe exponentially, then binary search in the bounded range
function exponentialSearch(sortedArray: number[], targetValue: number): number {
  const arrayLength = sortedArray.length; // @step:initialize
  if (arrayLength === 0) {
    return -1; // @step:complete
  }

  if (sortedArray[0] === targetValue) {
    // @step:visit
    return 0; // @step:found
  }

  // Phase 1: exponential probing to find the upper bound
  let boundIndex = 1; // @step:visit
  while (boundIndex < arrayLength && sortedArray[boundIndex]! <= targetValue) {
    // @step:visit
    boundIndex = boundIndex * 2; // @step:visit
  }

  // Phase 2: binary search in the range [boundIndex/2, min(boundIndex, length-1)]
  let lowIndex = Math.floor(boundIndex / 2); // @step:compare
  let highIndex = Math.min(boundIndex, arrayLength - 1); // @step:compare

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2); // @step:compare
    const midValue = sortedArray[midIndex]!; // @step:compare

    if (midValue === targetValue) {
      // @step:compare,found
      return midIndex; // @step:found
    } else if (midValue < targetValue) {
      // @step:eliminate
      lowIndex = midIndex + 1; // @step:eliminate
    } else {
      // @step:eliminate
      highIndex = midIndex - 1; // @step:eliminate
    }
  }

  return -1; // @step:complete
}
