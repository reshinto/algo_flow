// Find the Difference — find the extra character added to the modified string
package main

func findTheDifference(original string, modified string) byte {
	charCounts := make(map[rune]int) // @step:initialize
	for _, currentChar := range original {
		charCounts[currentChar]++ // @step:increment-count
	}
	for _, currentChar := range modified {
		charCounts[currentChar]-- // @step:decrement-count
		if charCounts[currentChar] < 0 {
			return byte(currentChar) // @step:key-found
		}
	}
	return 0 // @step:complete
}
