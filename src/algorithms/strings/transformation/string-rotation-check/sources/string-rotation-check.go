// String Rotation Check — checks if pattern is a rotation of text.
// Concatenates text with itself and searches for pattern as a substring.
// Time: O(n)  Space: O(n) for the concatenated string

package main

import "strings"

func stringRotationCheck(text string, pattern string) bool {
	if len(pattern) != len(text) { return false } // @step:initialize

	concatenated := text + text // @step:write-char

	return strings.Contains(concatenated, pattern) // @step:visit
}
