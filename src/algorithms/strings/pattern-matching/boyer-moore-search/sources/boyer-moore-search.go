// Boyer-Moore Search (Bad Character Rule)
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Compares pattern right-to-left; on mismatch, shifts using the bad character table.
// Time: best O(n/m), average O(n), worst O(nm)
// Space: O(σ) where σ = alphabet size (number of distinct characters in pattern)

package main

func buildBadCharTable(pattern []rune) map[rune]int {
	table := make(map[rune]int) // @step:build-bad-char

	for charIdx, ch := range pattern {
		table[ch] = charIdx // @step:build-bad-char
	}

	return table // @step:build-bad-char
}

func boyerMooreSearch(text string, pattern string) int {
	textChars := []rune(text)
	patternChars := []rune(pattern)

	if len(patternChars) == 0 { return 0 } // @step:initialize
	badCharTable := buildBadCharTable(patternChars) // @step:initialize

	patternLen := len(patternChars) // @step:initialize
	textLen := len(textChars) // @step:initialize

	alignmentOffset := 0 // @step:initialize

	for alignmentOffset <= textLen-patternLen {
		// @step:visit
		patternIdx := patternLen - 1 // @step:visit

		for patternIdx >= 0 && patternChars[patternIdx] == textChars[alignmentOffset+patternIdx] {
			patternIdx-- // @step:char-match
		}

		if patternIdx < 0 {
			// Full pattern matched
			return alignmentOffset // @step:char-match
		}

		// Mismatch — compute shift using bad character table
		mismatchChar := textChars[alignmentOffset+patternIdx] // @step:char-mismatch
		badCharShift, exists := badCharTable[mismatchChar]
		if !exists { badCharShift = -1 } // @step:char-mismatch
		shiftAmount := patternIdx - badCharShift
		if shiftAmount < 1 { shiftAmount = 1 } // @step:char-mismatch
		alignmentOffset += shiftAmount // @step:shift-pattern
	}

	return -1 // @step:complete
}
