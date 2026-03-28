// Subarray Product < K — O(n) variable sliding window counting subarrays with product below threshold
function subarrayProductLessThanK(inputArray: number[], threshold: number): SubarrayProductResult {
  if (inputArray.length === 0 || threshold <= 1) {
    // @step:initialize
    return { count: 0 }; // @step:initialize
  }

  let leftPointer = 0; // @step:initialize
  let currentProduct = 1;
  let count = 0;

  // Expand the right boundary of the window
  for (let rightPointer = 0; rightPointer < inputArray.length; rightPointer++) {
    currentProduct *= inputArray[rightPointer]!; // @step:expand-window

    // Shrink from the left while product meets or exceeds threshold
    while (currentProduct >= threshold && leftPointer <= rightPointer) {
      // @step:compare
      currentProduct /= inputArray[leftPointer]!; // @step:shrink-window
      leftPointer++; // @step:shrink-window
    }

    // Every subarray ending at rightPointer and starting anywhere in [leftPointer, rightPointer]
    count += rightPointer - leftPointer + 1; // @step:compare
  }

  return { count }; // @step:complete
}
