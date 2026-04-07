// Trie Insert and Search
// Inserts a list of words into a trie then checks if a target word exists as a full word.
// Time: O(m) per operation where m = word length
// Space: O(n * m) total for n words of average length m

package main

type TrieNodeIS struct {
	children map[rune]*TrieNodeIS
	isEnd    bool
}

func createNodeIS() *TrieNodeIS {
	return &TrieNodeIS{children: make(map[rune]*TrieNodeIS)} // @step:initialize
}

func trieInsertSearch(words []string, search string) bool {
	root := createNodeIS() // @step:initialize

	for _, word := range words {
		// @step:visit
		current := root // @step:visit
		for _, ch := range word {
			// @step:insert-trie
			if _, exists := current.children[ch]; !exists {
				current.children[ch] = createNodeIS() // @step:insert-trie
			}
			current = current.children[ch] // @step:traverse-trie
		}
		current.isEnd = true // @step:mark-end-word
	}

	current := root // @step:visit
	for _, ch := range search {
		// @step:traverse-trie
		if child, exists := current.children[ch]; exists {
			current = child // @step:traverse-trie
		} else {
			return false // @step:traverse-trie
		}
	}

	return current.isEnd // @step:complete
}
