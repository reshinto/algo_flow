// Run-Length Decoding — expands a compressed string like "3a2b4c" into "aaabbcccc".
// Parses leading digit sequences as repeat counts, then repeats the following character.
// Time: O(output length)  Space: O(output length)

package main

import (
	"strconv"
	"strings"
)

func runLengthDecoding(text string) string {
	var output []rune // @step:initialize

	chars := []rune(text)
	readIndex := 0 // @step:initialize

	for readIndex < len(chars) {
		digitString := "" // @step:read-char

		for readIndex < len(chars) && chars[readIndex] >= '0' && chars[readIndex] <= '9' {
			digitString += string(chars[readIndex]) // @step:read-char
			readIndex++
		}

		repeatCount, _ := strconv.Atoi(digitString) // @step:visit

		var letter rune
		if readIndex < len(chars) {
			letter = chars[readIndex] // @step:read-char
		}

		repeated := []rune(strings.Repeat(string(letter), repeatCount)) // @step:write-char

		for _, ch := range repeated {
			output = append(output, ch) // @step:write-char
		}

		readIndex++ // @step:visit
	}

	return string(output) // @step:complete
}
