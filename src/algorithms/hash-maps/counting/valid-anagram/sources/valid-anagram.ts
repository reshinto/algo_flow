// Valid Anagram — determine if two strings are anagrams using character frequency counts
function validAnagram(textA: string, textB: string): boolean {
  if (textA.length !== textB.length) return false; // @step:initialize
  const charCounts = new Map<string, number>(); // @step:initialize
  for (let charIndex = 0; charIndex < textA.length; charIndex++) {
    const currentChar = textA[charIndex]!; // @step:increment-count
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1); // @step:increment-count
  }
  for (let charIndex = 0; charIndex < textB.length; charIndex++) {
    const currentChar = textB[charIndex]!; // @step:decrement-count
    const updatedCount = (charCounts.get(currentChar) ?? 0) - 1; // @step:decrement-count
    if (updatedCount < 0) return false; // @step:complete
    charCounts.set(currentChar, updatedCount); // @step:decrement-count
  }
  return true; // @step:complete
}
