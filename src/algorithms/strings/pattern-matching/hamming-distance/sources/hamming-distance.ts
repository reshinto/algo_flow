// Hamming Distance
// Returns the number of positions where corresponding characters differ.
// Both strings must be equal length — returns -1 if lengths differ.
// Time: O(n), Space: O(1)

function hammingDistance(text: string, pattern: string): number {
  if (text.length !== pattern.length) return -1; // @step:initialize

  let distance = 0; // @step:initialize

  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    // @step:visit
    if (text[charIndex] !== pattern[charIndex]) {
      // Characters differ — increment the distance counter
      distance++; // @step:char-mismatch
    } else {
      // Characters match — no change to distance
      distance = distance; // @step:char-match
    }
  }

  return distance; // @step:complete
}
