// First Unique Character — find the index of the first non-repeating character in a string
function firstUniqueCharacter(text: string): number {
  const charCounts = new Map<string, number>(); // @step:initialize
  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    const currentChar = text[charIndex]!; // @step:increment-count
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1); // @step:increment-count
  }
  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    const currentChar = text[charIndex]!; // @step:lookup-key
    if (charCounts.get(currentChar) === 1) {
      // @step:key-found
      return charIndex; // @step:key-found
    }
  }
  return -1; // @step:complete
}
