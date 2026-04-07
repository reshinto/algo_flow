// Z-Algorithm Pattern Matching
// Concatenates pattern + "$" + text, builds Z-array where Z[i] = length of longest substring
// starting at i that matches a prefix of the combined string.
// If Z[i] == pattern.length, pattern found at position i - pattern.length - 1 in the text.
// Time: O(n + m) where n = text length, m = pattern length
// Space: O(n + m) for the combined string and Z-array

package main

func zAlgorithm(text string, pattern string) int {
	if len(pattern) == 0 { return 0 } // @step:initialize
	combined := []rune(pattern + "$" + text) // @step:initialize
	combinedLength := len(combined) // @step:initialize
	patternLength := len([]rune(pattern))
	zArray := make([]int, combinedLength) // @step:initialize

	windowLeft := 0 // @step:initialize
	windowRight := 0 // @step:initialize

	for pos := 1; pos < combinedLength; pos++ {
		// @step:build-failure
		if pos < windowRight {
			limit := windowRight - pos
			prev := zArray[pos-windowLeft]
			if prev < limit {
				zArray[pos] = prev // @step:build-failure
			} else {
				zArray[pos] = limit // @step:build-failure
			}
		}

		for pos+zArray[pos] < combinedLength && combined[zArray[pos]] == combined[pos+zArray[pos]] {
			zArray[pos]++ // @step:build-failure
		}

		if pos+zArray[pos] > windowRight {
			windowLeft = pos // @step:build-failure
			windowRight = pos + zArray[pos] // @step:build-failure
		}

		if zArray[pos] == patternLength {
			return pos - patternLength - 1 // @step:char-match
		}
	}

	return -1 // @step:complete
}
