// Jaro-Winkler Similarity
// Computes similarity between two strings using the Jaro formula,
// then boosts the score if the strings share a common prefix (up to 4 chars).
// Returns a value between 0.0 (completely dissimilar) and 1.0 (identical).
// Time: O(nm), Space: O(n) where n and m are the string lengths.

function jaroWinklerSimilarity(source: string, target: string): number {
  const sourceLength = source.length; // @step:initialize
  const targetLength = target.length; // @step:initialize

  // Identical strings have similarity 1.0
  if (source === target) return 1.0; // @step:initialize

  // Either empty string has similarity 0.0
  if (sourceLength === 0 || targetLength === 0) return 0.0; // @step:initialize

  // Match window: characters within this distance can be considered matching
  const matchWindow = Math.floor(Math.max(sourceLength, targetLength) / 2) - 1; // @step:initialize

  const sourceMatched = new Array<boolean>(sourceLength).fill(false); // @step:initialize
  const targetMatched = new Array<boolean>(targetLength).fill(false); // @step:initialize

  let matchCount = 0; // @step:initialize

  // Find matching characters within the match window
  for (let sourceIdx = 0; sourceIdx < sourceLength; sourceIdx++) {
    // @step:compare
    const windowStart = Math.max(0, sourceIdx - matchWindow); // @step:compare
    const windowEnd = Math.min(targetLength - 1, sourceIdx + matchWindow); // @step:compare

    for (let targetIdx = windowStart; targetIdx <= windowEnd; targetIdx++) {
      // @step:compare
      if (!targetMatched[targetIdx] && source[sourceIdx] === target[targetIdx]) {
        // @step:compare
        sourceMatched[sourceIdx] = true; // @step:compute-distance
        targetMatched[targetIdx] = true; // @step:compute-distance
        matchCount++; // @step:compute-distance
        break;
      }
    }
  }

  // No matches means similarity is 0
  if (matchCount === 0) return 0.0; // @step:compute-distance

  // Count transpositions: matched chars in different order
  let transpositionCount = 0; // @step:compute-distance
  let targetScanIdx = 0; // @step:compute-distance

  for (let sourceIdx = 0; sourceIdx < sourceLength; sourceIdx++) {
    // @step:compute-distance
    if (!sourceMatched[sourceIdx]) continue; // @step:compute-distance

    while (!targetMatched[targetScanIdx]) {
      // @step:compute-distance
      targetScanIdx++; // @step:compute-distance
    }

    if (source[sourceIdx] !== target[targetScanIdx]) {
      // @step:compute-distance
      transpositionCount++; // @step:compute-distance
    }

    targetScanIdx++; // @step:compute-distance
  }

  // Jaro similarity formula
  const halfTranspositions = transpositionCount / 2; // @step:compute-distance
  const jaroScore =
    (matchCount / sourceLength + // @step:compute-distance
      matchCount / targetLength + // @step:compute-distance
      (matchCount - halfTranspositions) / matchCount) / // @step:compute-distance
    3; // @step:compute-distance

  // Count common prefix length (up to 4 characters)
  const maxPrefixLength = 4; // @step:compute-distance
  let prefixLength = 0; // @step:compute-distance

  for (
    let prefixIdx = 0;
    prefixIdx < Math.min(maxPrefixLength, sourceLength, targetLength);
    prefixIdx++
  ) {
    // @step:compute-distance
    if (source[prefixIdx] === target[prefixIdx]) {
      // @step:compute-distance
      prefixLength++; // @step:compute-distance
    } else {
      break; // @step:compute-distance
    }
  }

  // Winkler bonus: reward common prefix
  const winklerBonus = prefixLength * 0.1 * (1 - jaroScore); // @step:compute-distance
  const jaroWinklerScore = jaroScore + winklerBonus; // @step:compute-distance

  return Math.round(jaroWinklerScore * 10000) / 10000; // @step:complete
}
