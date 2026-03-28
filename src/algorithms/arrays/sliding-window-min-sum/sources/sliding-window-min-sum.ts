// Sliding Window Min Sum — O(n) minimum-sum subarray of fixed size
function minSumSubarray(inputArray: number[], windowSize: number): SlidingWindowMinSumResult {
  if (inputArray.length === 0 || windowSize <= 0 || windowSize > inputArray.length) {
    // @step:initialize
    return { minSum: 0, windowStartIndex: 0 }; // @step:initialize
  }

  // Compute the sum of the first window as the baseline
  let currentSum = 0; // @step:move-window
  for (let initIndex = 0; initIndex < windowSize; initIndex++) {
    // @step:move-window
    currentSum += inputArray[initIndex]!; // @step:move-window
  }
  let minSum = currentSum;
  let windowStartIndex = 0;

  // Slide the window: subtract left element, add right element
  for (let rightIndex = windowSize; rightIndex < inputArray.length; rightIndex++) {
    currentSum -= inputArray[rightIndex - windowSize]!; // @step:shrink-window
    currentSum += inputArray[rightIndex]!; // @step:expand-window

    if (currentSum < minSum) {
      // @step:compare
      minSum = currentSum; // @step:compare
      windowStartIndex = rightIndex - windowSize + 1; // @step:compare
    }
  }
  return { minSum, windowStartIndex }; // @step:complete
}
