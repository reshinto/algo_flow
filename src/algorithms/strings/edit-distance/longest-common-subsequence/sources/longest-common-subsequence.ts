// Longest Common Subsequence (LCS)
// Returns the length of the longest subsequence common to both source and target.
// A subsequence preserves relative order but need not be contiguous.
// Time: O(nm), Space: O(nm) where n = source.length, m = target.length

export function longestCommonSubsequence(source: string, target: string): number {
  const sourceLength = source.length; // @step:initialize
  const targetLength = target.length; // @step:initialize

  // Allocate (sourceLength+1) × (targetLength+1) DP matrix, all zeroed
  const dp: number[][] = Array.from({ length: sourceLength + 1 }, () =>
    // @step:initialize
    new Array<number>(targetLength + 1).fill(0),
  );

  // Base case: dp[0][j] = 0 (LCS of empty string and any string is 0)
  for (let colIdx = 0; colIdx <= targetLength; colIdx++) {
    dp[0]![colIdx] = 0; // @step:fill-table
  }

  // Base case: dp[i][0] = 0 (LCS of any string and empty string is 0)
  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    dp[rowIdx]![0] = 0; // @step:fill-table
  }

  // Fill the rest of the matrix
  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= targetLength; colIdx++) {
      const sourceChar = source[rowIdx - 1]; // @step:compare
      const targetChar = target[colIdx - 1]; // @step:compare

      if (sourceChar === targetChar) {
        // Characters match — extend the LCS by 1
        dp[rowIdx]![colIdx] = dp[rowIdx - 1]![colIdx - 1]! + 1; // @step:compute-distance
      } else {
        // Take the best of: skip source char or skip target char
        dp[rowIdx]![colIdx] = Math.max(
          // @step:compute-distance
          dp[rowIdx - 1]![colIdx]!,
          dp[rowIdx]![colIdx - 1]!,
        );
      }
    }
  }

  return dp[sourceLength]![targetLength]!; // @step:complete
}
