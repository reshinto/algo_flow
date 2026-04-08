// Longest Common Prefix — vertical scanning column by column across all strings.
// Returns the longest prefix shared by every word in the input array.
// Time: O(n*m) where n = number of strings, m = min string length  Space: O(1)

package main

func longestCommonPrefix(words []string) string {
	if len(words) == 0 { return "" } // @step:initialize

	prefixLength := 0 // @step:initialize

	firstWordChars := []rune(words[0]) // @step:initialize

	outer:
	for columnIndex := 0; columnIndex < len(firstWordChars); columnIndex++ {
		currentChar := firstWordChars[columnIndex] // @step:read-char

		for wordIndex := 1; wordIndex < len(words); wordIndex++ {
			wordChars := []rune(words[wordIndex]) // @step:read-char
			var wordChar rune
			if columnIndex < len(wordChars) {
				wordChar = wordChars[columnIndex] // @step:read-char
			} else {
				wordChar = 0
			}

			if wordChar != currentChar {
				break outer // @step:complete
			}
		}

		prefixLength++ // @step:write-char
	}

	return string(firstWordChars[:prefixLength]) // @step:complete
}
