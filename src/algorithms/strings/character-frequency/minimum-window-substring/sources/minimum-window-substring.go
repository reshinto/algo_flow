// Minimum Window Substring
// Finds the smallest contiguous window in `text` that contains all characters of `pattern`.
// Returns an empty string if no such window exists.
// Time: O(n + m) where n = text.length, m = pattern.length
// Space: O(σ) — frequency maps bounded by alphabet size

package main

import "math"

func minimumWindowSubstring(text string, pattern string) string {
	if len(pattern) == 0 || len(text) < len(pattern) { return "" } // @step:initialize

	targetFrequency := make(map[rune]int) // @step:initialize
	for _, ch := range pattern {
		// @step:initialize
		targetFrequency[ch]++ // @step:initialize
	}

	windowFrequency := make(map[rune]int) // @step:initialize
	required := len(targetFrequency) // @step:initialize
	satisfied := 0 // @step:initialize
	leftIndex := 0 // @step:initialize
	bestStart := -1 // @step:initialize
	bestLength := math.MaxInt64 // @step:initialize

	textRunes := []rune(text)

	for rightIndex := 0; rightIndex < len(textRunes); rightIndex++ {
		// @step:expand-window
		rightChar := textRunes[rightIndex] // @step:expand-window
		windowFrequency[rightChar]++ // @step:update-frequency

		if targetCount, exists := targetFrequency[rightChar]; exists && windowFrequency[rightChar] == targetCount {
			// @step:window-match
			satisfied++ // @step:window-match
		}

		for satisfied == required {
			// @step:shrink-window
			windowLength := rightIndex - leftIndex + 1 // @step:add-to-result
			if windowLength < bestLength {
				// @step:add-to-result
				bestLength = windowLength // @step:add-to-result
				bestStart = leftIndex // @step:add-to-result
			}

			leftChar := textRunes[leftIndex] // @step:shrink-window
			windowFrequency[leftChar]-- // @step:update-frequency

			if leftTarget, exists := targetFrequency[leftChar]; exists && windowFrequency[leftChar] < leftTarget {
				// @step:shrink-window
				satisfied-- // @step:shrink-window
			}

			leftIndex++ // @step:shrink-window
		}
	}

	if bestStart == -1 {
		return "" // @step:complete
	}
	return string(textRunes[bestStart : bestStart+bestLength]) // @step:complete
}
