// Aho-Corasick Search
// Multi-pattern string search using a trie augmented with failure links.
// Phase 1: Insert all patterns into a trie.
// Phase 2: Build failure links via BFS (similar to KMP failure function but for a trie).
// Phase 3: Scan text once, following failure links on mismatch, collecting all pattern matches.
// Time: O(n + m + z) where n = text length, m = total pattern chars, z = match count
// Space: O(m * k) where k = alphabet size

interface AhoCorasickNode {
  children: Map<string, AhoCorasickNode>;
  failureLink: AhoCorasickNode | null;
  outputPatterns: string[];
  isEnd: boolean;
}

function createAhoCorasickNode(): AhoCorasickNode {
  // @step:initialize
  return { children: new Map(), failureLink: null, outputPatterns: [], isEnd: false }; // @step:initialize
}

function ahoCorasickSearch(text: string, patterns: string[]): string[] {
  const root = createAhoCorasickNode(); // @step:initialize

  // Phase 1: Insert all patterns into the trie
  for (const pattern of patterns) {
    // @step:visit
    let current = root; // @step:visit
    for (const char of pattern) {
      // @step:insert-trie
      if (!current.children.has(char)) {
        // @step:insert-trie
        current.children.set(char, createAhoCorasickNode()); // @step:insert-trie
      }
      current = current.children.get(char)!; // @step:traverse-trie
    }
    current.isEnd = true; // @step:mark-end-word
    current.outputPatterns.push(pattern); // @step:mark-end-word
  }

  // Phase 2: Build failure links via BFS
  const bfsQueue: AhoCorasickNode[] = []; // @step:buildFailureLinks

  for (const child of root.children.values()) {
    // @step:buildFailureLinks
    child.failureLink = root; // @step:buildFailureLinks
    bfsQueue.push(child); // @step:buildFailureLinks
  }

  while (bfsQueue.length > 0) {
    // @step:buildFailureLinks
    const current = bfsQueue.shift()!; // @step:buildFailureLinks

    for (const [char, childNode] of current.children.entries()) {
      // @step:buildFailureLinks
      let failureState = current.failureLink; // @step:buildFailureLinks

      while (failureState !== null && !failureState.children.has(char)) {
        // @step:buildFailureLinks
        failureState = failureState.failureLink; // @step:buildFailureLinks
      }

      childNode.failureLink = failureState ? (failureState.children.get(char) ?? root) : root; // @step:buildFailureLinks

      if (childNode.failureLink === childNode) {
        // @step:buildFailureLinks
        childNode.failureLink = root; // @step:buildFailureLinks
      }

      // Propagate output patterns from failure link
      for (const outputPattern of childNode.failureLink.outputPatterns) {
        // @step:buildFailureLinks
        if (!childNode.outputPatterns.includes(outputPattern)) {
          // @step:buildFailureLinks
          childNode.outputPatterns.push(outputPattern); // @step:buildFailureLinks
        }
      }

      bfsQueue.push(childNode); // @step:buildFailureLinks
    }
  }

  // Phase 3: Search text using the automaton
  const foundPatterns = new Set<string>(); // @step:traverse-trie
  let current = root; // @step:traverse-trie

  for (const char of text) {
    // @step:traverse-trie
    while (current !== root && !current.children.has(char)) {
      // @step:traverse-trie
      current = current.failureLink!; // @step:traverse-trie
    }

    if (current.children.has(char)) {
      // @step:traverse-trie
      current = current.children.get(char)!; // @step:traverse-trie
    }

    for (const matchedPattern of current.outputPatterns) {
      // @step:found
      foundPatterns.add(matchedPattern); // @step:found
    }
  }

  return Array.from(foundPatterns); // @step:complete
}
