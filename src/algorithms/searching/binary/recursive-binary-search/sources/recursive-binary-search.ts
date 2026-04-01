// Recursive Binary Search — halve the search range via recursive calls
function recursiveBinarySearch(sortedArray: number[], targetValue: number): number {
  // @step:initialize
  function searchRange(lowIndex: number, highIndex: number): number {
    // @step:initialize
    if (lowIndex > highIndex) {
      // @step:complete
      return -1; // @step:complete
    }

    const midIndex = Math.floor((lowIndex + highIndex) / 2); // @step:compare
    const midValue = sortedArray[midIndex]!; // @step:compare

    if (midValue === targetValue) {
      // @step:compare,found
      return midIndex; // @step:found
    } else if (midValue < targetValue) {
      // @step:eliminate
      // Target is in the upper half — discard the lower half
      return searchRange(midIndex + 1, highIndex); // @step:eliminate
    } else {
      // @step:eliminate
      // Target is in the lower half — discard the upper half
      return searchRange(lowIndex, midIndex - 1); // @step:eliminate
    }
  }

  return searchRange(0, sortedArray.length - 1); // @step:complete
}
