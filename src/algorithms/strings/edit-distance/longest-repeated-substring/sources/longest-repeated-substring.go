// Longest Repeated Substring
// Finds the longest substring that appears at least twice in the string.
// Uses a DP matrix comparing the string against itself, where dp[rowIdx][colIdx]
// represents the length of the longest common suffix of text[0..rowIdx-1] and text[0..colIdx-1].
// The diagonal (rowIdx === colIdx) is skipped to avoid trivial self-matches.
// Time: O(n²), Space: O(n²)

package main

func longestRepeatedSubstring(text string) string {
	textChars := []rune(text)
	textLength := len(textChars) // @step:initialize

	// Allocate (textLength+1) × (textLength+1) DP matrix
	dp := make([][]int, textLength+1) // @step:initialize
	for rowIdx := range dp {
		dp[rowIdx] = make([]int, textLength+1)
	}

	longestLength := 0 // @step:initialize
	longestEndIndex := 0 // @step:initialize

	// Fill the DP matrix — skip diagonal (rowIdx === colIdx) to avoid self-overlap
	for rowIdx := 1; rowIdx <= textLength; rowIdx++ {
		for colIdx := 1; colIdx <= textLength; colIdx++ {
			if rowIdx == colIdx { continue } // @step:compare — skip self-match on diagonal

			rowChar := textChars[rowIdx-1] // @step:compare
			colChar := textChars[colIdx-1] // @step:compare

			if rowChar == colChar {
				// Characters match — extend the common suffix length
				dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1] + 1 // @step:compute-distance
			} else {
				dp[rowIdx][colIdx] = 0 // @step:compute-distance
			}

			if dp[rowIdx][colIdx] > longestLength {
				longestLength = dp[rowIdx][colIdx] // @step:compute-distance
				longestEndIndex = rowIdx // @step:compute-distance
			}
		}
	}

	return string(textChars[longestEndIndex-longestLength : longestEndIndex]) // @step:complete
}
