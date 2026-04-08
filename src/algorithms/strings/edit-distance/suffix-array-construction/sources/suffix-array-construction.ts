// Suffix Array Construction (naive approach)
// Generates all suffixes of a string, sorts them lexicographically,
// and returns the array of starting indices in sorted suffix order.
// Time: O(n log²n) due to string comparisons during sort, Space: O(n)

function suffixArrayConstruction(text: string): number[] {
  const textLength = text.length; // @step:initialize

  if (textLength === 0) {
    return []; // @step:complete
  }

  // Build array of suffix starting indices [0, 1, ..., n-1]
  const suffixIndices: number[] = Array.from({ length: textLength }, (_, idx) => idx); // @step:initialize

  // Sort indices by their corresponding suffix lexicographically
  suffixIndices.sort((firstIdx, secondIdx) => {
    // @step:compare
    const firstSuffix = text.slice(firstIdx); // @step:compare
    const secondSuffix = text.slice(secondIdx); // @step:compare
    if (firstSuffix < secondSuffix) return -1; // @step:compare
    if (firstSuffix > secondSuffix) return 1; // @step:compare
    return 0; // @step:compare
  });

  return suffixIndices; // @step:complete
}
