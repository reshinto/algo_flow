// Max Consecutive Ones III — O(n) variable sliding window with at most k zero-flips
function maxConsecutiveOnes(inputArray: number[], maxFlips: number): MaxConsecutiveOnesResult {
  if (inputArray.length === 0) {
    // @step:initialize
    return { maxLength: 0, startIndex: 0 }; // @step:initialize
  }

  let leftPointer = 0; // @step:initialize
  let zeroCount = 0;
  let maxLength = 0;
  let bestStartIndex = 0;

  // Expand the right boundary of the window
  for (let rightPointer = 0; rightPointer < inputArray.length; rightPointer++) {
    if (inputArray[rightPointer] === 0) {
      zeroCount++; // @step:expand-window
    }

    // Shrink from left when zero count exceeds the allowed flips
    while (zeroCount > maxFlips) {
      // @step:compare
      if (inputArray[leftPointer] === 0) {
        zeroCount--; // @step:shrink-window
      }
      leftPointer++; // @step:shrink-window
    }

    const windowLength = rightPointer - leftPointer + 1; // @step:compare
    if (windowLength > maxLength) {
      // @step:compare
      maxLength = windowLength; // @step:compare
      bestStartIndex = leftPointer; // @step:compare
    }
  }

  return { maxLength, startIndex: bestStartIndex }; // @step:complete
}
