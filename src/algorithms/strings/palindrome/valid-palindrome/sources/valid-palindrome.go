// Valid Palindrome — Two-pointer approach ignoring non-alphanumeric characters
// Returns true if the string is a palindrome when only alphanumeric characters are considered.
// Time: O(n), Space: O(1)

package main

import "unicode"

func isAlphanumeric(ch rune) bool {
	return unicode.IsLetter(ch) || unicode.IsDigit(ch)
}

func validPalindrome(text string) bool {
	chars := []rune(text)
	leftIndex := 0 // @step:initialize
	rightIndex := len(chars) - 1 // @step:initialize

	for leftIndex < rightIndex {
		for leftIndex < rightIndex && !isAlphanumeric(chars[leftIndex]) {
			leftIndex++ // @step:skipNonAlphanumeric
		}
		for leftIndex < rightIndex && !isAlphanumeric(chars[rightIndex]) {
			rightIndex-- // @step:skipNonAlphanumeric
		}

		// @step:compare
		if unicode.ToLower(chars[leftIndex]) != unicode.ToLower(chars[rightIndex]) {
			return false // @step:mismatch
		}
		leftIndex++ // @step:match
		rightIndex-- // @step:match
	}

	return true // @step:complete
}
