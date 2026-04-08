// Longest Word in Trie
// Builds a trie from a list of words, then finds the longest word where every prefix is also a word.
// Uses DFS traversal, only following nodes marked as isEnd.
// Time: O(n*m) where n = number of words, m = average word length
// Space: O(n*m) for storing all nodes in the trie

package main

type TrieNodeLW struct {
	children map[rune]*TrieNodeLW
	isEnd    bool
}

func createTrieNodeLW() *TrieNodeLW {
	return &TrieNodeLW{children: make(map[rune]*TrieNodeLW)} // @step:initialize
}

func longestWordInTrie(words []string) string {
	root := createTrieNodeLW() // @step:initialize

	for _, word := range words {
		// @step:visit
		current := root // @step:visit
		for _, ch := range word {
			// @step:insert-trie
			if _, exists := current.children[ch]; !exists {
				current.children[ch] = createTrieNodeLW() // @step:insert-trie
			}
			current = current.children[ch] // @step:traverse-trie
		}
		current.isEnd = true // @step:mark-end-word
	}

	longestWord := "" // @step:visit

	// DFS stack holds [node, currentWordBuilt] pairs
	type stackEntry struct {
		node        *TrieNodeLW
		currentWord string
	}
	dfsStack := []stackEntry{{node: root, currentWord: ""}} // @step:visit

	for len(dfsStack) > 0 {
		// @step:traverse-trie
		entry := dfsStack[len(dfsStack)-1]
		dfsStack = dfsStack[:len(dfsStack)-1] // @step:traverse-trie
		currentNode := entry.node
		currentWord := entry.currentWord

		for ch, childNode := range currentNode.children {
			// @step:traverse-trie
			if childNode.isEnd {
				// @step:traverse-trie
				nextWord := currentWord + string(ch) // @step:traverse-trie
				if len([]rune(nextWord)) > len([]rune(longestWord)) ||
					(len([]rune(nextWord)) == len([]rune(longestWord)) && nextWord < longestWord) {
					longestWord = nextWord // @step:found
				}
				dfsStack = append(dfsStack, stackEntry{node: childNode, currentWord: nextWord}) // @step:traverse-trie
			}
		}
	}

	return longestWord // @step:complete
}
