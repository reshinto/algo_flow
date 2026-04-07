// Reverse String — two-pointer in-place swap on a character array.
// Returns the reversed version of the input string.
// Time: O(n)  Space: O(1) auxiliary (O(n) for the output string)

package main

func reverseString(text string) string {
	chars := []rune(text) // @step:initialize

	leftIndex := 0 // @step:initialize
	rightIndex := len(chars) - 1 // @step:initialize

	for leftIndex < rightIndex {
		leftChar := chars[leftIndex] // @step:read-char
		rightChar := chars[rightIndex] // @step:read-char

		chars[leftIndex] = rightChar // @step:swap-pointers
		chars[rightIndex] = leftChar // @step:swap-pointers

		leftIndex++ // @step:visit
		rightIndex-- // @step:visit
	}

	return string(chars) // @step:complete
}
