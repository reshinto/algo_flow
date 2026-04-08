// First Non-Repeating Character
// Returns the index of the first character that appears exactly once, or -1 if none.
// Time: O(n) — two passes over the string (bounded by alphabet size)
// Space: O(1) — frequency map bounded by alphabet size (26 letters)

function firstNonRepeatingCharacter(text: string): number {
  const frequencyMap = new Map<string, number>(); // @step:initialize

  for (const char of text) {
    // @step:update-frequency
    frequencyMap.set(char, (frequencyMap.get(char) ?? 0) + 1); // @step:update-frequency
  }

  for (let charIdx = 0; charIdx < text.length; charIdx++) {
    // @step:compare
    const char = text[charIdx]!; // @step:compare
    if (frequencyMap.get(char) === 1) return charIdx; // @step:found
  }

  return -1; // @step:complete
}
