// First Negative in Window — O(n) using a deque to track negative indices
function firstNegativeInWindow(inputArray: number[], windowSize: number): number[] {
  const arrayLength = inputArray.length;

  if (arrayLength === 0 || windowSize <= 0 || windowSize > arrayLength) {
    // @step:initialize
    return []; // @step:initialize
  }

  // Deque stores indices of negative numbers in current window
  const negativeIndices: number[] = []; // @step:initialize
  const result: number[] = [];

  // Process first window
  for (let initIndex = 0; initIndex < windowSize; initIndex++) {
    // @step:move-window
    if (inputArray[initIndex]! < 0) {
      // @step:move-window
      negativeIndices.push(initIndex); // @step:move-window
    }
  }

  // Record result for first window
  result.push(negativeIndices.length > 0 ? inputArray[negativeIndices[0]!]! : 0); // @step:compare

  // Slide window across remaining positions
  for (let rightIndex = windowSize; rightIndex < arrayLength; rightIndex++) {
    const leftIndex = rightIndex - windowSize;

    // Remove indices that are out of current window
    if (negativeIndices.length > 0 && negativeIndices[0]! <= leftIndex) {
      // @step:shrink-window
      negativeIndices.shift(); // @step:shrink-window
    }

    // Add new element if negative
    if (inputArray[rightIndex]! < 0) {
      // @step:expand-window
      negativeIndices.push(rightIndex); // @step:expand-window
    }

    // Record first negative in current window (or 0 if none)
    result.push(negativeIndices.length > 0 ? inputArray[negativeIndices[0]!]! : 0); // @step:compare
  }

  return result; // @step:complete
}
