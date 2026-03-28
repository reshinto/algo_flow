// Longest K-Distinct — O(n) variable sliding window with at-most K distinct elements
function longestKDistinct(
  inputArray: number[],
  maxDistinct: number,
): { maxLength: number; startIndex: number } {
  const arrayLength = inputArray.length;

  if (arrayLength === 0 || maxDistinct <= 0) {
    // @step:initialize
    return { maxLength: 0, startIndex: 0 }; // @step:initialize
  }

  const frequencyMap: Map<number, number> = new Map(); // @step:initialize
  let windowStart = 0;
  let maxLength = 0;
  let bestStart = 0;

  for (let windowEnd = 0; windowEnd < arrayLength; windowEnd++) {
    const incomingElement = inputArray[windowEnd]!; // @step:expand-window
    frequencyMap.set(incomingElement, (frequencyMap.get(incomingElement) ?? 0) + 1); // @step:expand-window

    // Shrink from the left while distinct count exceeds maxDistinct
    while (frequencyMap.size > maxDistinct) {
      const outgoingElement = inputArray[windowStart]!; // @step:shrink-window
      const outgoingCount = frequencyMap.get(outgoingElement)! - 1; // @step:shrink-window
      if (outgoingCount === 0) {
        // @step:shrink-window
        frequencyMap.delete(outgoingElement); // @step:shrink-window
      } else {
        frequencyMap.set(outgoingElement, outgoingCount); // @step:shrink-window
      }
      windowStart++; // @step:shrink-window
    }

    const currentLength = windowEnd - windowStart + 1; // @step:compare
    if (currentLength > maxLength) {
      // @step:compare
      maxLength = currentLength; // @step:compare
      bestStart = windowStart; // @step:compare
    }
  }

  return { maxLength, startIndex: bestStart }; // @step:complete
}
