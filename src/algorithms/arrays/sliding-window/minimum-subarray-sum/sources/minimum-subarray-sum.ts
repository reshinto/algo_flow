// Minimum Subarray Sum — O(n) inverted Kadane's algorithm tracking minimum instead of maximum
function minimumSubarraySum(inputArray: number[]): MinimumSubarraySumResult {
  if (inputArray.length === 0) {
    // @step:initialize
    return { minSum: 0, startIndex: 0, endIndex: 0 }; // @step:initialize
  }

  let minEndingHere = inputArray[0]!; // @step:initialize
  let minSoFar = inputArray[0]!; // @step:initialize
  let currentStartIndex = 0;
  let bestStartIndex = 0;
  let bestEndIndex = 0;

  // Extend the current subarray or restart from the current element
  for (let elementIndex = 1; elementIndex < inputArray.length; elementIndex++) {
    if (inputArray[elementIndex]! < minEndingHere + inputArray[elementIndex]!) {
      // @step:compare
      minEndingHere = inputArray[elementIndex]!; // @step:compare
      currentStartIndex = elementIndex; // @step:compare
    } else {
      minEndingHere += inputArray[elementIndex]!; // @step:compare
    }

    if (minEndingHere < minSoFar) {
      // @step:compare
      minSoFar = minEndingHere; // @step:compare
      bestStartIndex = currentStartIndex; // @step:compare
      bestEndIndex = elementIndex; // @step:compare
    }
  }

  return { minSum: minSoFar, startIndex: bestStartIndex, endIndex: bestEndIndex }; // @step:complete
}
