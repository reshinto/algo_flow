// Ransom Note — check if a ransom note can be constructed from magazine characters
package main

func ransomNote(ransomNoteText string, magazine string) bool {
	charCounts := make(map[rune]int) // @step:initialize
	for _, currentChar := range magazine {
		charCounts[currentChar]++ // @step:increment-count
	}
	for _, currentChar := range ransomNoteText {
		charCounts[currentChar]-- // @step:decrement-count
		updatedCount := charCounts[currentChar]
		if updatedCount < 0 {
			return false // @step:complete
		}
		// @step:decrement-count
	}
	return true // @step:complete
}
