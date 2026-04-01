// Square Root via Binary Search — find the integer square root of a non-negative number
function sqrtBinarySearch(targetValue: number): number {
  // @step:initialize
  if (targetValue < 2) return targetValue; // @step:initialize
  let lowIndex = 1; // @step:initialize
  let highIndex = Math.floor(targetValue / 2); // @step:initialize
  let resultIndex = 0; // @step:initialize

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2); // @step:compare
    const midSquared = midIndex * midIndex; // @step:compare

    if (midSquared === targetValue) {
      // @step:compare,found
      return midIndex; // @step:found
    } else if (midSquared < targetValue) {
      // @step:eliminate
      // midIndex is a candidate floor — search for a larger value
      resultIndex = midIndex; // @step:eliminate
      lowIndex = midIndex + 1; // @step:eliminate
    } else {
      // @step:eliminate
      // midIndex is too large — search left
      highIndex = midIndex - 1; // @step:eliminate
    }
  }

  return resultIndex; // @step:complete
}
