// Min Size Subarray Sum — O(n) variable sliding window to find shortest subarray with sum >= target
function minSizeSubarraySum(inputArray: number[], target: number): MinSizeSubarraySumResult {
  if (inputArray.length === 0 || target <= 0) {
    // @step:initialize
    return { minLength: 0, startIndex: 0 }; // @step:initialize
  }

  let leftPointer = 0; // @step:initialize
  let currentSum = 0;
  let minLength = Infinity;
  let bestStartIndex = 0;

  // Expand the right boundary of the window
  for (let rightPointer = 0; rightPointer < inputArray.length; rightPointer++) {
    currentSum += inputArray[rightPointer]!; // @step:expand-window

    // Shrink from the left while the sum constraint is satisfied
    while (currentSum >= target) {
      // @step:compare
      const windowLength = rightPointer - leftPointer + 1; // @step:compare
      if (windowLength < minLength) {
        // @step:compare
        minLength = windowLength; // @step:compare
        bestStartIndex = leftPointer; // @step:compare
      }
      currentSum -= inputArray[leftPointer]!; // @step:shrink-window
      leftPointer++; // @step:shrink-window
    }
  }

  if (minLength === Infinity) {
    return { minLength: 0, startIndex: 0 }; // @step:complete
  }
  return { minLength, startIndex: bestStartIndex }; // @step:complete
}
