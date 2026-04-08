// Levenshtein Distance (edit distance)
// Returns the minimum number of single-character edits (insertions, deletions,
// replacements) required to transform source into target.
// Time: O(nm), Space: O(nm) where n = source.length, m = target.length

function levenshteinDistance(source: string, target: string): number {
  const sourceLength = source.length; // @step:initialize
  const targetLength = target.length; // @step:initialize

  // Allocate (sourceLength+1) × (targetLength+1) DP matrix
  const dp: number[][] = Array.from({ length: sourceLength + 1 }, () =>
    // @step:initialize
    new Array<number>(targetLength + 1).fill(0),
  );

  // Base case: transforming empty string to target[0..j-1] requires j insertions
  for (let colIdx = 0; colIdx <= targetLength; colIdx++) {
    dp[0]![colIdx] = colIdx; // @step:fill-table
  }

  // Base case: transforming source[0..i-1] to empty string requires i deletions
  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    dp[rowIdx]![0] = rowIdx; // @step:fill-table
  }

  // Fill the rest of the matrix
  for (let rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
    for (let colIdx = 1; colIdx <= targetLength; colIdx++) {
      const sourceChar = source[rowIdx - 1]; // @step:compare
      const targetChar = target[colIdx - 1]; // @step:compare

      if (sourceChar === targetChar) {
        // Characters match — no new edit needed
        dp[rowIdx]![colIdx] = dp[rowIdx - 1]![colIdx - 1]!; // @step:compute-distance
      } else {
        // Choose the cheapest of: replace, delete, insert
        const replaceCost = dp[rowIdx - 1]![colIdx - 1]! + 1; // @step:compute-distance
        const deleteCost = dp[rowIdx - 1]![colIdx]! + 1; // @step:compute-distance
        const insertCost = dp[rowIdx]![colIdx - 1]! + 1; // @step:compute-distance
        dp[rowIdx]![colIdx] = Math.min(replaceCost, deleteCost, insertCost); // @step:compute-distance
      }
    }
  }

  return dp[sourceLength]![targetLength]!; // @step:complete
}
