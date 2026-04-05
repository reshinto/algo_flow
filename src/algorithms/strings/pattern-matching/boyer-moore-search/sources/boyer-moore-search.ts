// Boyer-Moore Search (Bad Character Rule)
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Compares pattern right-to-left; on mismatch, shifts using the bad character table.
// Time: best O(n/m), average O(n), worst O(nm)
// Space: O(σ) where σ = alphabet size (number of distinct characters in pattern)

function boyerMooreSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0; // @step:initialize
  const badCharTable = buildBadCharTable(pattern); // @step:initialize

  const patternLen = pattern.length; // @step:initialize
  const textLen = text.length; // @step:initialize

  let alignmentOffset = 0; // @step:initialize

  while (alignmentOffset <= textLen - patternLen) {
    // @step:visit
    let patternIdx = patternLen - 1; // @step:visit

    while (patternIdx >= 0 && pattern[patternIdx] === text[alignmentOffset + patternIdx]) {
      patternIdx--; // @step:char-match
    }

    if (patternIdx < 0) {
      // Full pattern matched
      return alignmentOffset; // @step:char-match
    }

    // Mismatch — compute shift using bad character table
    const mismatchChar = text[alignmentOffset + patternIdx]!; // @step:char-mismatch
    const badCharShift = badCharTable.get(mismatchChar) ?? -1; // @step:char-mismatch
    const shiftAmount = Math.max(1, patternIdx - badCharShift); // @step:char-mismatch
    alignmentOffset += shiftAmount; // @step:shift-pattern
  }

  return -1; // @step:complete
}

function buildBadCharTable(pattern: string): Map<string, number> {
  const table = new Map<string, number>(); // @step:build-bad-char

  for (let charIdx = 0; charIdx < pattern.length; charIdx++) {
    table.set(pattern[charIdx]!, charIdx); // @step:build-bad-char
  }

  return table; // @step:build-bad-char
}
