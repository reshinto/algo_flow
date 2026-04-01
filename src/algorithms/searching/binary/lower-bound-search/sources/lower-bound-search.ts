// Lower Bound Search — find the first position where element >= target
function lowerBoundSearch(sortedArray: number[], targetValue: number): number {
  // @step:initialize
  let lowIndex = 0; // @step:initialize
  let highIndex = sortedArray.length; // @step:initialize
  let resultIndex = sortedArray.length; // @step:initialize

  while (lowIndex < highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2); // @step:compare
    const midValue = sortedArray[midIndex]!; // @step:compare

    if (midValue >= targetValue) {
      // @step:compare,found
      // midValue is a candidate — record it and search for an earlier occurrence
      resultIndex = midIndex; // @step:found
      highIndex = midIndex; // @step:eliminate
    } else {
      // @step:eliminate
      // midValue is too small — the lower bound must be to the right
      lowIndex = midIndex + 1; // @step:eliminate
    }
  }

  return resultIndex; // @step:complete
}
