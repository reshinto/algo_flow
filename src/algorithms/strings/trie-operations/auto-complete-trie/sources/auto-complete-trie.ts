// Auto-Complete with Trie
// Builds a trie from a word list, then returns all words that start with the given prefix.
// Time: O(m + k) where m = prefix length, k = total characters in all result words
// Space: O(n * m) for n words of average length m

interface TrieNodeInternal {
  children: Map<string, TrieNodeInternal>;
  isEnd: boolean;
}

function createNode(): TrieNodeInternal {
  return { children: new Map(), isEnd: false }; // @step:initialize
}

function collectWords(node: TrieNodeInternal, currentPrefix: string, results: string[]): void {
  if (node.isEnd) {
    // @step:add-to-result
    results.push(currentPrefix); // @step:add-to-result
  }
  for (const [char, child] of node.children) {
    // @step:traverse-trie
    collectWords(child, currentPrefix + char, results); // @step:traverse-trie
  }
}

export function autoCompleteTrie(words: string[], prefix: string): string[] {
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

  let prefixNode = root; // @step:visit
  for (const char of prefix) {
    // @step:traverse-trie
    if (!prefixNode.children.has(char)) {
      return []; // @step:traverse-trie
    }
    prefixNode = prefixNode.children.get(char)!; // @step:traverse-trie
  }

  const results: string[] = [];
  collectWords(prefixNode, prefix, results); // @step:add-to-result
  return results; // @step:complete
}
