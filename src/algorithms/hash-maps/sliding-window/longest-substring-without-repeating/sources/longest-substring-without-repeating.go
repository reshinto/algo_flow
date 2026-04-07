// Longest Substring Without Repeating Characters — sliding window with hash map
package main

func longestSubstringWithoutRepeating(text string) int {
	charIndexMap := make(map[rune]int) // @step:initialize
	windowStart := 0
	maxLength := 0
	for windowEnd, currentChar := range text {
		previousIndex, exists := charIndexMap[currentChar] // @step:check-duplicate
		if exists && previousIndex >= windowStart {
			windowStart = previousIndex + 1 // @step:shrink-window
		}
		charIndexMap[currentChar] = windowEnd // @step:insert-key
		currentLength := windowEnd - windowStart + 1 // @step:expand-window
		if currentLength > maxLength {
			maxLength = currentLength
		}
	}
	return maxLength // @step:complete
}
