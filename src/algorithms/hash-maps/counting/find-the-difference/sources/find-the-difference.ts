// Find the Difference — find the extra character added to the modified string
function findTheDifference(original: string, modified: string): string {
  const charCounts = new Map<string, number>(); // @step:initialize
  for (let charIndex = 0; charIndex < original.length; charIndex++) {
    const currentChar = original[charIndex]!;
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1); // @step:increment-count
  }
  for (let charIndex = 0; charIndex < modified.length; charIndex++) {
    const currentChar = modified[charIndex]!;
    const count = (charCounts.get(currentChar) ?? 0) - 1; // @step:decrement-count
    charCounts.set(currentChar, count);
    if (count < 0) return currentChar; // @step:key-found
  }
  return ""; // @step:complete
}

export { findTheDifference };
