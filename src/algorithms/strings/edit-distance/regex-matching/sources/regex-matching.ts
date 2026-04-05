// Regular Expression Matching
// Determines if text matches a pattern that may contain '.' (any single character)
// or '*' (zero or more of the preceding element).
// Uses dynamic programming: dp[rowIdx][colIdx] = true if text[0..rowIdx-1] matches pattern[0..colIdx-1].
// Time: O(nm), Space: O(nm) where n = text.length, m = pattern.length

export function regexMatching(text: string, pattern: string): boolean {
  const textLength = text.length; // @step:initialize
  const patternLength = pattern.length; // @step:initialize

  // Allocate (textLength+1) × (patternLength+1) boolean DP matrix (stored as 1/0)
  const dp: number[][] = Array.from({ length: textLength + 1 }, () =>
    // @step:initialize
    new Array<number>(patternLength + 1).fill(0),
  );

  // Base case: empty text matches empty pattern
  dp[0]![0] = 1; // @step:fill-table

  // Base case: empty text can match patterns like "a*", "a*b*", etc.
  for (let colIdx = 2; colIdx <= patternLength; colIdx++) {
    if (pattern[colIdx - 1] === "*") {
      dp[0]![colIdx] = dp[0]![colIdx - 2]!; // @step:fill-table
    }
  }

  // Fill the rest of the matrix
  for (let rowIdx = 1; rowIdx <= textLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= patternLength; colIdx++) {
      const textChar = text[rowIdx - 1]; // @step:compare
      const patternChar = pattern[colIdx - 1]; // @step:compare

      if (patternChar === "*") {
        // '*' with preceding element: zero occurrences (skip two pattern chars) or one more char
        const zeroOccurrences = dp[rowIdx]![colIdx - 2]!; // @step:compute-distance
        const precedingChar = pattern[colIdx - 2];
        const charMatches = precedingChar === "." || precedingChar === textChar;
        const oneMore = charMatches ? dp[rowIdx - 1]![colIdx]! : 0; // @step:compute-distance
        dp[rowIdx]![colIdx] = zeroOccurrences === 1 || oneMore === 1 ? 1 : 0; // @step:compute-distance
      } else if (patternChar === "." || patternChar === textChar) {
        // '.' matches any single char, or exact character match
        dp[rowIdx]![colIdx] = dp[rowIdx - 1]![colIdx - 1]!; // @step:compute-distance
      } else {
        dp[rowIdx]![colIdx] = 0; // @step:compute-distance
      }
    }
  }

  return dp[textLength]![patternLength]! === 1; // @step:complete
}
