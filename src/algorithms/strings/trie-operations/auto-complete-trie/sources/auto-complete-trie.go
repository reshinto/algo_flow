// Auto-Complete with Trie
// Builds a trie from a word list, then returns all words that start with the given prefix.
// Time: O(m + k) where m = prefix length, k = total characters in all result words
// Space: O(n * m) for n words of average length m

package main

type TrieNodeAC struct {
	children map[rune]*TrieNodeAC
	isEnd    bool
}

func createNodeAC() *TrieNodeAC {
	return &TrieNodeAC{children: make(map[rune]*TrieNodeAC)} // @step:initialize
}

func collectWords(node *TrieNodeAC, currentPrefix string, results *[]string) {
	if node.isEnd {
		// @step:add-to-result
		*results = append(*results, currentPrefix) // @step:add-to-result
	}
	for ch, child := range node.children {
		// @step:traverse-trie
		collectWords(child, currentPrefix+string(ch), results) // @step:traverse-trie
	}
}

func autoCompleteTrie(words []string, prefix string) []string {
	root := createNodeAC() // @step:initialize

	for _, word := range words {
		// @step:visit
		current := root // @step:visit
		for _, ch := range word {
			// @step:insert-trie
			if _, exists := current.children[ch]; !exists {
				current.children[ch] = createNodeAC() // @step:insert-trie
			}
			current = current.children[ch] // @step:traverse-trie
		}
		current.isEnd = true // @step:mark-end-word
	}

	prefixNode := root // @step:visit
	for _, ch := range prefix {
		// @step:traverse-trie
		if child, exists := prefixNode.children[ch]; exists {
			prefixNode = child // @step:traverse-trie
		} else {
			return []string{} // @step:traverse-trie
		}
	}

	results := []string{}
	collectWords(prefixNode, prefix, &results) // @step:add-to-result
	return results // @step:complete
}
