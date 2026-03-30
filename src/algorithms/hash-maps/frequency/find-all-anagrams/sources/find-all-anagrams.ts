// Find All Anagrams — slide a window over text and record start indices where window is an anagram of pattern
function findAllAnagrams(text: string, pattern: string): number[] {
  const patternFreq = new Map<string, number>(); // @step:initialize
  for (let patternIdx = 0; patternIdx < pattern.length; patternIdx++) {
    const patternChar = pattern[patternIdx]!;
    patternFreq.set(patternChar, (patternFreq.get(patternChar) ?? 0) + 1); // @step:increment-count
  }
  const windowFreq = new Map<string, number>();
  const windowSize = pattern.length;
  const result: number[] = [];
  for (let rightIdx = 0; rightIdx < text.length; rightIdx++) {
    // Expand window: add incoming character
    const incomingChar = text[rightIdx]!;
    windowFreq.set(incomingChar, (windowFreq.get(incomingChar) ?? 0) + 1); // @step:expand-window
    // Shrink window: remove outgoing character once full window is established
    if (rightIdx >= windowSize) {
      const outgoingChar = text[rightIdx - windowSize]!;
      const outgoingCount = windowFreq.get(outgoingChar)! - 1; // @step:shrink-window
      if (outgoingCount === 0) {
        windowFreq.delete(outgoingChar); // @step:decrement-count
      } else {
        windowFreq.set(outgoingChar, outgoingCount); // @step:decrement-count
      }
    }
    // Check if current window matches pattern frequency map
    if (rightIdx >= windowSize - 1) {
      if (mapsEqual(windowFreq, patternFreq)) {
        result.push(rightIdx - windowSize + 1); // @step:key-found
      }
    }
  }
  return result; // @step:complete
}

function mapsEqual(mapA: Map<string, number>, mapB: Map<string, number>): boolean {
  if (mapA.size !== mapB.size) return false;
  for (const [key, value] of mapA.entries()) {
    if (mapB.get(key) !== value) return false;
  }
  return true;
}
