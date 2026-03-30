// Longest Substring Without Repeating Characters — sliding window with hash map
function longestSubstringWithoutRepeating(text: string): number {
  const charIndexMap = new Map<string, number>(); // @step:initialize
  let windowStart = 0;
  let maxLength = 0;
  for (let windowEnd = 0; windowEnd < text.length; windowEnd++) {
    const currentChar = text[windowEnd]!;
    const previousIndex = charIndexMap.get(currentChar); // @step:check-duplicate
    if (previousIndex !== undefined && previousIndex >= windowStart) {
      windowStart = previousIndex + 1; // @step:shrink-window
    }
    charIndexMap.set(currentChar, windowEnd); // @step:insert-key
    const currentLength = windowEnd - windowStart + 1; // @step:expand-window
    maxLength = Math.max(maxLength, currentLength);
  }
  return maxLength; // @step:complete
}

export { longestSubstringWithoutRepeating };
