// Longest Word in Trie
// Builds a trie from a list of words, then finds the longest word where every prefix is also a word.
// Uses DFS traversal, only following nodes marked as isEnd.
// Time: O(n*m) where n = number of words, m = average word length
// Space: O(n*m) for storing all nodes in the trie

interface TrieNodeInternal {
  children: Map<string, TrieNodeInternal>;
  isEnd: boolean;
}

function createTrieNode(): TrieNodeInternal {
  return { children: new Map(), isEnd: false }; // @step:initialize
}

function longestWordInTrie(words: string[]): string {
  const root = createTrieNode(); // @step:initialize

  for (const word of words) {
    // @step:visit
    let current = root; // @step:visit
    for (const char of word) {
      // @step:insert-trie
      if (!current.children.has(char)) {
        current.children.set(char, createTrieNode()); // @step:insert-trie
      }
      current = current.children.get(char)!; // @step:traverse-trie
    }
    current.isEnd = true; // @step:mark-end-word
  }

  let longestWord = ""; // @step:visit

  // DFS stack holds [node, currentWordBuilt] pairs
  const dfsStack: [TrieNodeInternal, string][] = [[root, ""]]; // @step:visit

  while (dfsStack.length > 0) {
    // @step:traverse-trie
    const entry = dfsStack.pop()!; // @step:traverse-trie
    const currentNode = entry[0];
    const currentWord = entry[1];

    for (const [char, childNode] of currentNode.children) {
      // @step:traverse-trie
      if (childNode.isEnd) {
        // @step:traverse-trie
        const nextWord = currentWord + char; // @step:traverse-trie
        if (
          nextWord.length > longestWord.length ||
          (nextWord.length === longestWord.length && nextWord < longestWord)
        ) {
          longestWord = nextWord; // @step:found
        }
        dfsStack.push([childNode, nextWord]); // @step:traverse-trie
      }
    }
  }

  return longestWord; // @step:complete
}
