// Sliding Window — O(n) max-sum subarray by sliding instead of recomputing
function maxSumSubarray(inputArray: number[], windowSize: number): SlidingWindowResult {
  if (inputArray.length === 0 || windowSize <= 0 || windowSize > inputArray.length) {
    // @step:initialize
    return { maxSum: 0, windowStartIndex: 0 }; // @step:initialize
  }

  // Compute the sum of the first window as the baseline
  let currentSum = 0; // @step:move-window
  for (let initIndex = 0; initIndex < windowSize; initIndex++) {
    // @step:move-window
    currentSum += inputArray[initIndex]!; // @step:move-window
  }
  let maxSum = currentSum;
  let windowStartIndex = 0;

  // Slide the window: subtract left element, add right element
  for (let rightIndex = windowSize; rightIndex < inputArray.length; rightIndex++) {
    currentSum -= inputArray[rightIndex - windowSize]!; // @step:shrink-window
    currentSum += inputArray[rightIndex]!; // @step:expand-window

    if (currentSum > maxSum) {
      // @step:compare
      maxSum = currentSum; // @step:compare
      windowStartIndex = rightIndex - windowSize + 1; // @step:compare
    }
  }
  return { maxSum, windowStartIndex }; // @step:complete
}
