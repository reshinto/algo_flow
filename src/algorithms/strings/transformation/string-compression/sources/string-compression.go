// String Compression (Run-Length Encoding) — count consecutive repeated characters.
// Returns the compressed form "a2b1c5a3" only if shorter than the original; otherwise returns the original.
// Time: O(n)  Space: O(n) for the output buffer

package main

import (
	"strconv"
	"strings"
)

func stringCompression(text string) string {
	chars := []rune(text)
	if len(chars) == 0 { return text } // @step:initialize

	var compressedBuilder strings.Builder // @step:initialize
	charIndex := 0 // @step:initialize

	for charIndex < len(chars) {
		currentChar := chars[charIndex] // @step:read-char
		count := 0 // @step:read-char

		for charIndex < len(chars) && chars[charIndex] == currentChar {
			count++ // @step:count
			charIndex++ // @step:count
		}

		compressedBuilder.WriteRune(currentChar) // @step:write-char
		compressedBuilder.WriteString(strconv.Itoa(count)) // @step:write-char
	}

	compressed := compressedBuilder.String()
	if len([]rune(compressed)) < len(chars) { return compressed } // @step:complete
	return text // @step:complete
}
