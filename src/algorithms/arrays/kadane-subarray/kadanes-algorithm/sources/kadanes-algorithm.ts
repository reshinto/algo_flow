// Kadane's Algorithm — O(n) maximum subarray sum via extend-or-restart decision
function kadanesAlgorithm(inputArray: number[]): {
  maxSum: number;
  startIndex: number;
  endIndex: number;
} {
  if (inputArray.length === 0) {
    // @step:initialize
    return { maxSum: 0, startIndex: -1, endIndex: -1 }; // @step:initialize
  }

  let currentSum = inputArray[0]!; // @step:initialize
  let globalMax = inputArray[0]!; // @step:initialize
  let currentStart = 0;
  let bestStart = 0;
  let bestEnd = 0;

  for (let scanIndex = 1; scanIndex < inputArray.length; scanIndex++) {
    const extendSum = currentSum + inputArray[scanIndex]!; // @step:compare
    const restartSum = inputArray[scanIndex]!; // @step:compare

    if (restartSum > extendSum) {
      // @step:compare
      currentSum = restartSum; // @step:shrink-window
      currentStart = scanIndex; // @step:shrink-window
    } else {
      currentSum = extendSum; // @step:expand-window
    }

    if (currentSum > globalMax) {
      // @step:visit
      globalMax = currentSum; // @step:visit
      bestStart = currentStart; // @step:visit
      bestEnd = scanIndex; // @step:visit
    }
  }

  return { maxSum: globalMax, startIndex: bestStart, endIndex: bestEnd }; // @step:complete
}
