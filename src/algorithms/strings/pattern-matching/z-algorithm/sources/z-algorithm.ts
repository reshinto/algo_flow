// Z-Algorithm Pattern Matching
// Concatenates pattern + "$" + text, builds Z-array where Z[i] = length of longest substring
// starting at i that matches a prefix of the combined string.
// If Z[i] == pattern.length, pattern found at position i - pattern.length - 1 in the text.
// Time: O(n + m) where n = text length, m = pattern length
// Space: O(n + m) for the combined string and Z-array

function zAlgorithm(text: string, pattern: string): number {
  if (pattern.length === 0) return 0; // @step:initialize
  const combined = pattern + "$" + text; // @step:initialize
  const combinedLength = combined.length; // @step:initialize
  const zArray = new Array<number>(combinedLength).fill(0); // @step:initialize

  let windowLeft = 0; // @step:initialize
  let windowRight = 0; // @step:initialize

  for (let pos = 1; pos < combinedLength; pos++) {
    // @step:build-failure
    if (pos < windowRight) {
      zArray[pos] = Math.min(windowRight - pos, zArray[pos - windowLeft]!); // @step:build-failure
    }

    while (
      pos + (zArray[pos] ?? 0) < combinedLength &&
      combined[zArray[pos] ?? 0] === combined[pos + (zArray[pos] ?? 0)]
    ) {
      zArray[pos] = (zArray[pos] ?? 0) + 1; // @step:build-failure
    }

    if (pos + (zArray[pos] ?? 0) > windowRight) {
      windowLeft = pos; // @step:build-failure
      windowRight = pos + (zArray[pos] ?? 0); // @step:build-failure
    }

    if ((zArray[pos] ?? 0) === pattern.length) {
      return pos - pattern.length - 1; // @step:char-match
    }
  }

  return -1; // @step:complete
}
