// Wildcard Matching
// Determines if a text string matches a pattern that may contain '?' (any single character)
// or '*' (any sequence of characters, including empty).
// Uses dynamic programming: dp[rowIdx][colIdx] = true if text[0..rowIdx-1] matches pattern[0..colIdx-1].
// Time: O(nm), Space: O(nm) where n = text.length, m = pattern.length

function wildcardMatching(text: string, pattern: string): boolean {
  const textLength = text.length; // @step:initialize
  const patternLength = pattern.length; // @step:initialize

  // Allocate (textLength+1) × (patternLength+1) boolean DP matrix (stored as 1/0)
  const dp: number[][] = Array.from({ length: textLength + 1 }, () =>
    // @step:initialize
    new Array<number>(patternLength + 1).fill(0),
  );

  // Base case: empty text matches empty pattern
  dp[0]![0] = 1; // @step:fill-table

  // Base case: empty text can only match a pattern of all '*'
  for (let colIdx = 1; colIdx <= patternLength; colIdx++) {
    dp[0]![colIdx] = pattern[colIdx - 1] === "*" ? dp[0]![colIdx - 1]! : 0; // @step:fill-table
  }

  // Fill the rest of the matrix
  for (let rowIdx = 1; rowIdx <= textLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= patternLength; colIdx++) {
      const textChar = text[rowIdx - 1]; // @step:compare
      const patternChar = pattern[colIdx - 1]; // @step:compare

      if (patternChar === "*") {
        // '*' matches empty sequence (dp[rowIdx][colIdx-1]) or one more char (dp[rowIdx-1][colIdx])
        const matchEmpty = dp[rowIdx]![colIdx - 1]!; // @step:compute-distance
        const matchOne = dp[rowIdx - 1]![colIdx]!; // @step:compute-distance
        dp[rowIdx]![colIdx] = matchEmpty === 1 || matchOne === 1 ? 1 : 0; // @step:compute-distance
      } else if (patternChar === "?" || patternChar === textChar) {
        // '?' matches any single char, or exact character match
        dp[rowIdx]![colIdx] = dp[rowIdx - 1]![colIdx - 1]!; // @step:compute-distance
      } else {
        dp[rowIdx]![colIdx] = 0; // @step:compute-distance
      }
    }
  }

  return dp[textLength]![patternLength]! === 1; // @step:complete
}
