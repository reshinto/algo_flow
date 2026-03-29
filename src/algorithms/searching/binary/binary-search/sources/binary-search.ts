// Binary Search — halve the search range on each iteration
function binarySearch(sortedArray: number[], targetValue: number): number {
  // @step:initialize
  let lowIndex = 0; // @step:initialize
  let highIndex = sortedArray.length - 1; // @step:initialize

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2); // @step:compare
    const midValue = sortedArray[midIndex]!; // @step:compare

    if (midValue === targetValue) {
      // @step:compare,found
      return midIndex; // @step:found
    } else if (midValue < targetValue) {
      // @step:eliminate
      // Target is in the upper half — discard the lower half
      lowIndex = midIndex + 1; // @step:eliminate
    } else {
      // @step:eliminate
      // Target is in the lower half — discard the upper half
      highIndex = midIndex - 1; // @step:eliminate
    }
  }

  return -1; // @step:complete
}
