// Naive (brute-force) pattern search — checks every position in text.
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Time: O(n * m) worst case where n = text length, m = pattern length
// Space: O(1) — no auxiliary data structures

package main

func naivePatternSearch(text string, pattern string) int {
	textChars := []rune(text)
	patternChars := []rune(pattern)

	if len(patternChars) == 0 { return 0 } // @step:initialize
	patternLen := len(patternChars)
	textLen := len(textChars)

	for textIdx := 0; textIdx <= textLen-patternLen; textIdx++ {
		// @step:visit
		patternIdx := 0 // @step:visit
		for patternIdx < patternLen && textChars[textIdx+patternIdx] == patternChars[patternIdx] {
			// @step:char-match
			patternIdx++ // @step:char-match
		}
		if patternIdx == patternLen { return textIdx } // @step:complete
		// Mismatch — slide pattern right by one // @step:char-mismatch
	}
	return -1 // @step:complete
}
