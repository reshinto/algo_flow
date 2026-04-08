// KMP (Knuth-Morris-Pratt) Pattern Matching
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Time: O(n + m) where n = text length, m = pattern length
// Space: O(m) for the failure table

package main

func buildFailureTable(pattern []rune) []int {
	failure := make([]int, len(pattern)) // @step:build-failure
	prefixLen := 0 // @step:build-failure
	tableIdx := 1 // @step:build-failure

	for tableIdx < len(pattern) {
		if pattern[tableIdx] == pattern[prefixLen] {
			prefixLen++ // @step:build-failure
			failure[tableIdx] = prefixLen // @step:build-failure
			tableIdx++ // @step:build-failure
		} else if prefixLen > 0 {
			prefixLen = failure[prefixLen-1] // @step:build-failure
		} else {
			failure[tableIdx] = 0 // @step:build-failure
			tableIdx++ // @step:build-failure
		}
	}

	return failure // @step:build-failure
}

func kmpSearch(text string, pattern string) int {
	textChars := []rune(text)
	patternChars := []rune(pattern)

	if len(patternChars) == 0 { return 0 } // @step:initialize
	failure := buildFailureTable(patternChars) // @step:initialize

	textIdx := 0 // @step:initialize
	patternIdx := 0 // @step:initialize

	for textIdx < len(textChars) {
		// @step:visit
		if textChars[textIdx] == patternChars[patternIdx] {
			// Characters match — advance both pointers
			textIdx++ // @step:char-match
			patternIdx++ // @step:char-match

			if patternIdx == len(patternChars) {
				// Full pattern matched
				return textIdx - patternIdx // @step:char-match
			}
		} else if patternIdx > 0 {
			// Mismatch after some matches — use failure table to avoid redundant comparisons
			patternIdx = failure[patternIdx-1] // @step:char-mismatch
		} else {
			// Mismatch at pattern start — advance text pointer
			textIdx++ // @step:char-mismatch
		}
	}

	return -1 // @step:complete
}
