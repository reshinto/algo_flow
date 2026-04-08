// Palindrome Check — Two-pointer approach
// Returns true if the string reads the same forwards and backwards.
// Time: O(n), Space: O(1)

package main

func palindromeCheck(text string) bool {
	chars := []rune(text)
	leftIndex := 0 // @step:initialize
	rightIndex := len(chars) - 1 // @step:initialize

	for leftIndex < rightIndex {
		// @step:compare
		if chars[leftIndex] != chars[rightIndex] {
			return false // @step:mismatch
		}
		leftIndex++ // @step:match
		rightIndex-- // @step:match
	}

	return true // @step:complete
}
