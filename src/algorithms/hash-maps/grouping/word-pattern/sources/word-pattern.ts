// Word Pattern — check if a string follows a pattern using bidirectional hash map mapping
function wordPattern(pattern: string, sentence: string): boolean {
  const words = sentence.split(" "); // @step:initialize
  const charToWord = new Map<string, string>(); // @step:initialize
  const wordToChar = new Map<string, string>(); // @step:initialize
  if (pattern.length !== words.length) return false; // @step:initialize
  for (let charIndex = 0; charIndex < pattern.length; charIndex++) {
    const patternChar = pattern[charIndex]!;
    const currentWord = words[charIndex]!;
    const mappedWord = charToWord.get(patternChar); // @step:lookup-key
    const mappedChar = wordToChar.get(currentWord); // @step:lookup-key
    if (mappedWord === undefined && mappedChar === undefined) {
      charToWord.set(patternChar, currentWord); // @step:insert-key
      wordToChar.set(currentWord, patternChar); // @step:insert-key
    } else if (mappedWord === currentWord && mappedChar === patternChar) {
      // @step:key-found
      continue; // @step:key-found
    } else {
      return false; // @step:key-not-found
    }
  }
  return true; // @step:complete
}
