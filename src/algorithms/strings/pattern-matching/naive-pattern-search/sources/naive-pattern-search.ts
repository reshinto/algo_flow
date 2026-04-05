// Naive (brute-force) pattern search — checks every position in text.
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Time: O(n * m) worst case where n = text length, m = pattern length
// Space: O(1) — no auxiliary data structures

export function naivePatternSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0; // @step:initialize
  for (let textIdx = 0; textIdx <= text.length - pattern.length; textIdx++) {
    // @step:visit
    let patternIdx = 0; // @step:visit
    while (patternIdx < pattern.length && text[textIdx + patternIdx] === pattern[patternIdx]) {
      // @step:char-match
      patternIdx++; // @step:char-match
    }
    if (patternIdx === pattern.length) return textIdx; // @step:complete
    // Mismatch — slide pattern right by one // @step:char-mismatch
  }
  return -1; // @step:complete
}
