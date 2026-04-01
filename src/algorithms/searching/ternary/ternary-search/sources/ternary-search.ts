// Ternary Search — divide the array into three parts on each iteration
function ternarySearch(sortedArray: number[], targetValue: number): number {
  // @step:initialize
  let lowIndex = 0; // @step:initialize
  let highIndex = sortedArray.length - 1; // @step:initialize

  while (lowIndex <= highIndex) {
    const rangeSize = highIndex - lowIndex; // @step:compare
    const mid1Index = lowIndex + Math.floor(rangeSize / 3); // @step:compare
    const mid2Index = highIndex - Math.floor(rangeSize / 3); // @step:compare

    const mid1Value = sortedArray[mid1Index]!; // @step:compare
    const mid2Value = sortedArray[mid2Index]!; // @step:compare

    if (mid1Value === targetValue) {
      // @step:compare,found
      return mid1Index; // @step:found
    }

    if (mid2Value === targetValue) {
      // @step:compare,found
      return mid2Index; // @step:found
    }

    if (targetValue < mid1Value) {
      // @step:eliminate
      // Target is in the left third
      highIndex = mid1Index - 1; // @step:eliminate
    } else if (targetValue > mid2Value) {
      // @step:eliminate
      // Target is in the right third
      lowIndex = mid2Index + 1; // @step:eliminate
    } else {
      // @step:eliminate
      // Target is in the middle third
      lowIndex = mid1Index + 1; // @step:eliminate
      highIndex = mid2Index - 1; // @step:eliminate
    }
  }

  return -1; // @step:complete
}
