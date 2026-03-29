// Count Anagram Windows — O(n) sliding window with frequency map comparison
function countAnagramWindows(
  text: number[],
  pattern: number[],
): { count: number; positions: number[] } {
  const patternLength = pattern.length;
  const textLength = text.length;

  if (patternLength === 0 || patternLength > textLength) {
    // @step:initialize
    return { count: 0, positions: [] }; // @step:initialize
  }

  const patternFrequency: Map<number, number> = new Map(); // @step:initialize
  const windowFrequency: Map<number, number> = new Map(); // @step:initialize
  const positions: number[] = [];

  // Build pattern frequency map
  for (const patternElement of pattern) {
    // @step:initialize
    patternFrequency.set(patternElement, (patternFrequency.get(patternElement) ?? 0) + 1); // @step:initialize
  }

  // Build initial window frequency map
  for (let initIndex = 0; initIndex < patternLength; initIndex++) {
    // @step:move-window
    const currentElement = text[initIndex]!; // @step:move-window
    windowFrequency.set(currentElement, (windowFrequency.get(currentElement) ?? 0) + 1); // @step:move-window
  }

  // Helper: compare two frequency maps for equality
  const mapsAreEqual = (mapA: Map<number, number>, mapB: Map<number, number>): boolean => {
    if (mapA.size !== mapB.size) return false;
    for (const [key, value] of mapA) {
      if (mapB.get(key) !== value) return false;
    }
    return true;
  };

  // Check first window
  if (mapsAreEqual(patternFrequency, windowFrequency)) {
    // @step:compare
    positions.push(0); // @step:compare
  }

  // Slide window across remaining positions
  for (let rightIndex = patternLength; rightIndex < textLength; rightIndex++) {
    const leftIndex = rightIndex - patternLength;
    const outgoingElement = text[leftIndex]!; // @step:shrink-window
    const incomingElement = text[rightIndex]!; // @step:expand-window

    // Remove outgoing element from window
    const outgoingCount = windowFrequency.get(outgoingElement)! - 1; // @step:shrink-window
    if (outgoingCount === 0) {
      // @step:shrink-window
      windowFrequency.delete(outgoingElement); // @step:shrink-window
    } else {
      windowFrequency.set(outgoingElement, outgoingCount); // @step:shrink-window
    }

    // Add incoming element to window
    windowFrequency.set(incomingElement, (windowFrequency.get(incomingElement) ?? 0) + 1); // @step:expand-window

    if (mapsAreEqual(patternFrequency, windowFrequency)) {
      // @step:compare
      positions.push(leftIndex + 1); // @step:compare
    }
  }

  return { count: positions.length, positions }; // @step:complete
}
