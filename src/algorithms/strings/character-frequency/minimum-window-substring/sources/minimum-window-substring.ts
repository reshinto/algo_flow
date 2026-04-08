// Minimum Window Substring
// Finds the smallest contiguous window in `text` that contains all characters of `pattern`.
// Returns an empty string if no such window exists.
// Time: O(n + m) where n = text.length, m = pattern.length
// Space: O(σ) — frequency maps bounded by alphabet size

function minimumWindowSubstring(text: string, pattern: string): string {
  if (pattern.length === 0 || text.length < pattern.length) return ""; // @step:initialize

  const targetFrequency = new Map<string, number>(); // @step:initialize
  for (const char of pattern) {
    // @step:initialize
    targetFrequency.set(char, (targetFrequency.get(char) ?? 0) + 1); // @step:initialize
  }

  const windowFrequency = new Map<string, number>(); // @step:initialize
  const required = targetFrequency.size; // @step:initialize
  let satisfied = 0; // @step:initialize
  let leftIndex = 0; // @step:initialize
  let bestStart = -1; // @step:initialize
  let bestLength = Infinity; // @step:initialize

  for (let rightIndex = 0; rightIndex < text.length; rightIndex++) {
    // @step:expand-window
    const rightChar = text[rightIndex]!; // @step:expand-window
    windowFrequency.set(rightChar, (windowFrequency.get(rightChar) ?? 0) + 1); // @step:update-frequency

    const targetCount = targetFrequency.get(rightChar); // @step:window-match
    if (targetCount !== undefined && windowFrequency.get(rightChar) === targetCount) {
      // @step:window-match
      satisfied += 1; // @step:window-match
    }

    while (satisfied === required) {
      // @step:shrink-window
      const windowLength = rightIndex - leftIndex + 1; // @step:add-to-result
      if (windowLength < bestLength) {
        // @step:add-to-result
        bestLength = windowLength; // @step:add-to-result
        bestStart = leftIndex; // @step:add-to-result
      }

      const leftChar = text[leftIndex]!; // @step:shrink-window
      windowFrequency.set(leftChar, (windowFrequency.get(leftChar) ?? 0) - 1); // @step:update-frequency

      const leftTarget = targetFrequency.get(leftChar); // @step:shrink-window
      if (leftTarget !== undefined && (windowFrequency.get(leftChar) ?? 0) < leftTarget) {
        // @step:shrink-window
        satisfied -= 1; // @step:shrink-window
      }

      leftIndex += 1; // @step:shrink-window
    }
  }

  return bestStart === -1 ? "" : text.slice(bestStart, bestStart + bestLength); // @step:complete
}
