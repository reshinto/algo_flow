// Trie Prefix Count
// Builds a trie from a list of words and counts how many words start with a given prefix.
// Each node stores a prefixCount incremented during insertion.
// Time: O(m) for prefix search, O(n * m) to build trie for n words of average length m
// Space: O(n * m) total node storage

package main

type TrieNodePC struct {
	children    map[rune]*TrieNodePC
	prefixCount int
	isEnd       bool
}

func createNodePC() *TrieNodePC {
	return &TrieNodePC{children: make(map[rune]*TrieNodePC)} // @step:initialize
}

func triePrefixCount(words []string, prefix string) int {
	root := createNodePC() // @step:initialize

	for _, word := range words {
		// @step:visit
		current := root // @step:visit
		for _, ch := range word {
			// @step:insert-trie
			if _, exists := current.children[ch]; !exists {
				current.children[ch] = createNodePC() // @step:insert-trie
			}
			current = current.children[ch] // @step:traverse-trie
			current.prefixCount++ // @step:insert-trie
		}
		current.isEnd = true // @step:mark-end-word
	}

	current := root // @step:visit
	for _, ch := range prefix {
		// @step:traverse-trie
		if child, exists := current.children[ch]; exists {
			current = child // @step:traverse-trie
		} else {
			return 0 // @step:traverse-trie
		}
	}

	return current.prefixCount // @step:complete
}
