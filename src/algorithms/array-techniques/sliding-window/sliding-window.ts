export interface SlidingWindowResult {
  maxSum: number;
  windowStartIndex: number;
}

export function maxSumSubarray(inputArray: number[], windowSize: number): SlidingWindowResult {
  if (inputArray.length === 0 || windowSize <= 0 || windowSize > inputArray.length) {
    return { maxSum: 0, windowStartIndex: 0 };
  }

  /* Compute the sum of the initial window */
  let currentSum = 0;
  for (let initIndex = 0; initIndex < windowSize; initIndex++) {
    currentSum += inputArray[initIndex]!;
  }

  let maxSum = currentSum;
  let windowStartIndex = 0;

  /* Slide the window to the right */
  for (let rightIndex = windowSize; rightIndex < inputArray.length; rightIndex++) {
    currentSum -= inputArray[rightIndex - windowSize]!;
    currentSum += inputArray[rightIndex]!;

    if (currentSum > maxSum) {
      maxSum = currentSum;
      windowStartIndex = rightIndex - windowSize + 1;
    }
  }

  return { maxSum, windowStartIndex };
}
