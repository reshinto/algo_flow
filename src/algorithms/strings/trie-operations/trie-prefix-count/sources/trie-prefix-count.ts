// Trie Prefix Count
// Builds a trie from a list of words and counts how many words start with a given prefix.
// Each node stores a prefixCount incremented during insertion.
// Time: O(m) for prefix search, O(n * m) to build trie for n words of average length m
// Space: O(n * m) total node storage

interface TrieNodeInternal {
  children: Map<string, TrieNodeInternal>;
  prefixCount: number;
  isEnd: boolean;
}

function createNode(): TrieNodeInternal {
  return { children: new Map(), prefixCount: 0, isEnd: false }; // @step:initialize
}

export function triePrefixCount(words: string[], prefix: string): number {
  const root = createNode(); // @step:initialize

  for (const word of words) {
    // @step:visit
    let current = root; // @step:visit
    for (const char of word) {
      // @step:insert-trie
      if (!current.children.has(char)) {
        current.children.set(char, createNode()); // @step:insert-trie
      }
      current = current.children.get(char)!; // @step:traverse-trie
      current.prefixCount += 1; // @step:insert-trie
    }
    current.isEnd = true; // @step:mark-end-word
  }

  let current = root; // @step:visit
  for (const char of prefix) {
    // @step:traverse-trie
    if (!current.children.has(char)) {
      return 0; // @step:traverse-trie
    }
    current = current.children.get(char)!; // @step:traverse-trie
  }

  return current.prefixCount; // @step:complete
}
