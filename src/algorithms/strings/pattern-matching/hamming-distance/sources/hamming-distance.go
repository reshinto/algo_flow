// Hamming Distance
// Returns the number of positions where corresponding characters differ.
// Both strings must be equal length — returns -1 if lengths differ.
// Time: O(n), Space: O(1)

package main

func hammingDistance(text string, pattern string) int {
	if len(text) != len(pattern) { return -1 } // @step:initialize

	distance := 0 // @step:initialize

	textChars := []rune(text)
	patternChars := []rune(pattern)
	for charIndex := 0; charIndex < len(textChars); charIndex++ {
		// @step:visit
		if textChars[charIndex] != patternChars[charIndex] {
			// Characters differ — increment the distance counter
			distance++ // @step:char-mismatch
		} else {
			// Characters match — no change to distance
			_ = distance // @step:char-match
		}
	}

	return distance // @step:complete
}
