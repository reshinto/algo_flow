// Aho-Corasick Search
// Multi-pattern string search using a trie augmented with failure links.
// Phase 1: Insert all patterns into a trie.
// Phase 2: Build failure links via BFS (similar to KMP failure function but for a trie).
// Phase 3: Scan text once, following failure links on mismatch, collecting all pattern matches.
// Time: O(n + m + z) where n = text length, m = total pattern chars, z = match count
// Space: O(m * k) where k = alphabet size

package main

type AhoCorasickNode struct {
	children       map[rune]*AhoCorasickNode
	failureLink    *AhoCorasickNode
	outputPatterns []string
	isEnd          bool
}

func createAhoCorasickNode() *AhoCorasickNode {
	// @step:initialize
	return &AhoCorasickNode{children: make(map[rune]*AhoCorasickNode), outputPatterns: []string{}} // @step:initialize
}

func ahoCorasickSearch(text string, patterns []string) []string {
	root := createAhoCorasickNode() // @step:initialize

	// Phase 1: Insert all patterns into the trie
	for _, pattern := range patterns {
		// @step:visit
		current := root // @step:visit
		for _, ch := range pattern {
			// @step:insert-trie
			if _, exists := current.children[ch]; !exists {
				// @step:insert-trie
				current.children[ch] = createAhoCorasickNode() // @step:insert-trie
			}
			current = current.children[ch] // @step:traverse-trie
		}
		current.isEnd = true // @step:mark-end-word
		current.outputPatterns = append(current.outputPatterns, pattern) // @step:mark-end-word
	}

	// Phase 2: Build failure links via BFS
	bfsQueue := []*AhoCorasickNode{} // @step:buildFailureLinks

	for _, child := range root.children {
		// @step:buildFailureLinks
		child.failureLink = root // @step:buildFailureLinks
		bfsQueue = append(bfsQueue, child) // @step:buildFailureLinks
	}

	for len(bfsQueue) > 0 {
		// @step:buildFailureLinks
		current := bfsQueue[0]
		bfsQueue = bfsQueue[1:] // @step:buildFailureLinks

		for ch, childNode := range current.children {
			// @step:buildFailureLinks
			failureState := current.failureLink // @step:buildFailureLinks

			for failureState != nil && failureState.children[ch] == nil {
				// @step:buildFailureLinks
				failureState = failureState.failureLink // @step:buildFailureLinks
			}

			if failureState != nil {
				if candidate := failureState.children[ch]; candidate != nil {
					childNode.failureLink = candidate
				} else {
					childNode.failureLink = root
				}
			} else {
				childNode.failureLink = root
			} // @step:buildFailureLinks

			if childNode.failureLink == childNode {
				// @step:buildFailureLinks
				childNode.failureLink = root // @step:buildFailureLinks
			}

			// Propagate output patterns from failure link
			for _, outputPattern := range childNode.failureLink.outputPatterns {
				// @step:buildFailureLinks
				alreadyPresent := false
				for _, existing := range childNode.outputPatterns {
					if existing == outputPattern { alreadyPresent = true; break }
				}
				if !alreadyPresent {
					// @step:buildFailureLinks
					childNode.outputPatterns = append(childNode.outputPatterns, outputPattern) // @step:buildFailureLinks
				}
			}

			bfsQueue = append(bfsQueue, childNode) // @step:buildFailureLinks
		}
	}

	// Phase 3: Search text using the automaton
	foundSet := make(map[string]bool) // @step:traverse-trie
	current := root // @step:traverse-trie

	for _, ch := range text {
		// @step:traverse-trie
		for current != root && current.children[ch] == nil {
			// @step:traverse-trie
			current = current.failureLink // @step:traverse-trie
		}

		if child, exists := current.children[ch]; exists {
			// @step:traverse-trie
			current = child // @step:traverse-trie
		}

		for _, matchedPattern := range current.outputPatterns {
			// @step:found
			foundSet[matchedPattern] = true // @step:found
		}
	}

	foundPatterns := make([]string, 0, len(foundSet))
	for pattern := range foundSet {
		foundPatterns = append(foundPatterns, pattern)
	}
	return foundPatterns // @step:complete
}
