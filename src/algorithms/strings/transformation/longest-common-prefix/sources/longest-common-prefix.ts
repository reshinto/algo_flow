// Longest Common Prefix — vertical scanning column by column across all strings.
// Returns the longest prefix shared by every word in the input array.
// Time: O(n*m) where n = number of strings, m = min string length  Space: O(1)

function longestCommonPrefix(words: string[]): string {
  if (words.length === 0) return ""; // @step:initialize

  let prefixLength = 0; // @step:initialize

  const firstWord = words[0] ?? ""; // @step:initialize

  for (let columnIndex = 0; columnIndex < firstWord.length; columnIndex++) {
    const currentChar = firstWord[columnIndex]; // @step:read-char

    for (let wordIndex = 1; wordIndex < words.length; wordIndex++) {
      const word = words[wordIndex] ?? ""; // @step:read-char
      const wordChar = word[columnIndex]; // @step:read-char

      if (wordChar !== currentChar) {
        return firstWord.slice(0, prefixLength); // @step:complete
      }
    }

    prefixLength++; // @step:write-char
  }

  return firstWord.slice(0, prefixLength); // @step:complete
}
