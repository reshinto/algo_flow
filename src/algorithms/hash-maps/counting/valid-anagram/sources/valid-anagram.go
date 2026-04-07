// Valid Anagram — determine if two strings are anagrams using character frequency counts
package main

func validAnagram(textA string, textB string) bool {
	if len(textA) != len(textB) {
		return false // @step:initialize
	}
	charCounts := make(map[rune]int) // @step:initialize
	for _, currentChar := range textA {
		charCounts[currentChar]++ // @step:increment-count
	}
	for _, currentChar := range textB {
		charCounts[currentChar]--              // @step:decrement-count
		updatedCount := charCounts[currentChar] // @step:decrement-count
		if updatedCount < 0 {
			return false // @step:complete
		}
		// @step:decrement-count
	}
	return true // @step:complete
}
