// First Unique Character — find the index of the first non-repeating character in a string
package main

func firstUniqueCharacter(text string) int {
	charCounts := make(map[rune]int) // @step:initialize
	for _, currentChar := range text {
		charCounts[currentChar]++ // @step:increment-count
	}
	for charIndex, currentChar := range text {
		_ = currentChar // @step:lookup-key
		if charCounts[currentChar] == 1 {
			return charIndex // @step:key-found
		}
	}
	return -1 // @step:complete
}
