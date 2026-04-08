// Trie Insert and Search
// Inserts a list of words into a trie then checks if a target word exists as a full word.
// Time: O(m) per operation where m = word length
// Space: O(n * m) total for n words of average length m

interface TrieNodeInternal {
  children: Map<string, TrieNodeInternal>;
  isEnd: boolean;
}

function createNode(): TrieNodeInternal {
  return { children: new Map(), isEnd: false }; // @step:initialize
}

function trieInsertSearch(words: string[], search: string): boolean {
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
    }
    current.isEnd = true; // @step:mark-end-word
  }

  let current = root; // @step:visit
  for (const char of search) {
    // @step:traverse-trie
    if (!current.children.has(char)) {
      return false; // @step:traverse-trie
    }
    current = current.children.get(char)!; // @step:traverse-trie
  }

  return current.isEnd; // @step:complete
}
