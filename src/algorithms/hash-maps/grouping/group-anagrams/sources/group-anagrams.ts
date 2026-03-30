// Group Anagrams — group words that are anagrams of each other using sorted-key hashing
function groupAnagrams(words: string[]): string[][] {
  const map = new Map<string, string[]>(); // @step:initialize
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const word = words[wordIndex]!;
    const sortedKey = word.split("").sort().join(""); // @step:lookup-key
    if (map.has(sortedKey)) {
      const group = map.get(sortedKey)!;
      group.push(word); // @step:update-value
    } else {
      map.set(sortedKey, [word]); // @step:insert-key
    }
  }
  return Array.from(map.values()); // @step:complete
}
