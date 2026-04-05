// Longest Common Substring
// Finds the length of the longest substring shared by both source and target.
// Uses DP: dp[rowIdx][colIdx] = length of longest common substring ending at
// source[rowIdx-1] and target[colIdx-1]. Resets to 0 on mismatch.
// Time: O(nm), Space: O(nm) where n = source.length, m = target.length

export function longestCommonSubstring(source: string, target: string): number {
  const sourceLength = source.length; // @step:initialize
  const targetLength = target.length; // @step:initialize

  // Allocate (sourceLength+1) × (targetLength+1) DP matrix, all zeros
  const dp: number[][] = Array.from({ length: sourceLength + 1 }, () =>
    // @step:initialize
    new Array<number>(targetLength + 1).fill(0),
  );

  let maxLength = 0; // @step:initialize

  // Fill interior cells — no base case rows needed; row/col 0 stay 0
  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= targetLength; colIdx++) {
      const sourceChar = source[rowIdx - 1]; // @step:compare
      const targetChar = target[colIdx - 1]; // @step:compare

      if (sourceChar === targetChar) {
        // Characters match — extend the common substring ending here
        dp[rowIdx]![colIdx] = dp[rowIdx - 1]![colIdx - 1]! + 1; // @step:compute-distance
        if (dp[rowIdx]![colIdx]! > maxLength) {
          maxLength = dp[rowIdx]![colIdx]!; // @step:compute-distance
        }
      } else {
        // Mismatch — common substring cannot extend through this cell
        dp[rowIdx]![colIdx] = 0; // @step:compute-distance
      }
    }
  }

  return maxLength; // @step:complete
}
