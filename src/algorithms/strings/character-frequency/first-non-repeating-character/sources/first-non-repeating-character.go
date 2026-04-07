// First Non-Repeating Character
// Returns the index of the first character that appears exactly once, or -1 if none.
// Time: O(n) — two passes over the string (bounded by alphabet size)
// Space: O(1) — frequency map bounded by alphabet size (26 letters)

package main

func firstNonRepeatingCharacter(text string) int {
	frequencyMap := make(map[rune]int) // @step:initialize

	for _, ch := range text {
		// @step:update-frequency
		frequencyMap[ch]++ // @step:update-frequency
	}

	runes := []rune(text)
	for charIdx, ch := range runes {
		// @step:compare
		if frequencyMap[ch] == 1 { return charIdx } // @step:found
	}

	return -1 // @step:complete
}
