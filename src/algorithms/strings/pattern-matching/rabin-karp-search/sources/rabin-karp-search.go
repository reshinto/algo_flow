// Rabin-Karp Pattern Matching
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Uses a rolling polynomial hash to skip comparisons when hashes differ.
// Time: O(n + m) average, O(n * m) worst case (hash collisions)
// Space: O(1)

package main

const hashBase = 31
const hashPrime = 1_000_000_007

func rabinKarpSearch(text string, pattern string) int {
	textChars := []rune(text)
	patternChars := []rune(pattern)

	if len(patternChars) == 0 { return 0 } // @step:initialize
	if len(patternChars) > len(textChars) { return -1 } // @step:initialize

	patternLen := len(patternChars) // @step:initialize
	textLen := len(textChars) // @step:initialize

	// Compute base^(patternLen-1) % prime for rolling hash window removal
	highPow := int64(1) // @step:initialize
	for powIdx := 0; powIdx < patternLen-1; powIdx++ {
		highPow = (highPow * hashBase) % hashPrime // @step:initialize
	}

	// Compute hash of pattern and first window
	patternHash := int64(0) // @step:initialize
	windowHash := int64(0) // @step:initialize
	for charIdx := 0; charIdx < patternLen; charIdx++ {
		patternHash = (patternHash*hashBase + int64(patternChars[charIdx])) % hashPrime // @step:initialize
		windowHash = (windowHash*hashBase + int64(textChars[charIdx])) % hashPrime // @step:initialize
	}

	// Slide the window over the text
	for windowStart := 0; windowStart <= textLen-patternLen; windowStart++ {
		// @step:visit
		if windowHash == patternHash {
			// Hashes match — verify character by character to rule out false positives
			charIdx := 0 // @step:char-match
			for charIdx < patternLen && textChars[windowStart+charIdx] == patternChars[charIdx] {
				charIdx++ // @step:char-match
			}

			if charIdx == patternLen {
				return windowStart // @step:char-match
			}
			// Hash collision — hashes matched but characters did not
		}

		// Roll hash: remove leading character, add next character
		if windowStart < textLen-patternLen {
			outgoingCharCode := int64(textChars[windowStart]) // @step:pattern-shift
			incomingCharCode := int64(textChars[windowStart+patternLen]) // @step:pattern-shift
			windowHash =
				((windowHash-outgoingCharCode*highPow)*hashBase+incomingCharCode) % hashPrime // @step:pattern-shift
			if windowHash < 0 { windowHash += hashPrime } // @step:pattern-shift
		}
	}

	return -1 // @step:complete
}
