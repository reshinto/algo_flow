// Wildcard Matching
// Determines if a text string matches a pattern that may contain '?' (any single character)
// or '*' (any sequence of characters, including empty).
// Uses dynamic programming: dp[rowIdx][colIdx] = true if text[0..rowIdx-1] matches pattern[0..colIdx-1].
// Time: O(nm), Space: O(nm) where n = text.length, m = pattern.length

package main

func wildcardMatching(text string, pattern string) bool {
	textChars := []rune(text)
	patternChars := []rune(pattern)
	textLength := len(textChars) // @step:initialize
	patternLength := len(patternChars) // @step:initialize

	// Allocate (textLength+1) × (patternLength+1) boolean DP matrix (stored as 1/0)
	dp := make([][]int, textLength+1) // @step:initialize
	for rowIdx := range dp {
		dp[rowIdx] = make([]int, patternLength+1)
	}

	// Base case: empty text matches empty pattern
	dp[0][0] = 1 // @step:fill-table

	// Base case: empty text can only match a pattern of all '*'
	for colIdx := 1; colIdx <= patternLength; colIdx++ {
		if patternChars[colIdx-1] == '*' {
			dp[0][colIdx] = dp[0][colIdx-1] // @step:fill-table
		} else {
			dp[0][colIdx] = 0 // @step:fill-table
		}
	}

	// Fill the rest of the matrix
	for rowIdx := 1; rowIdx <= textLength; rowIdx++ {
		for colIdx := 1; colIdx <= patternLength; colIdx++ {
			textChar := textChars[rowIdx-1] // @step:compare
			patternChar := patternChars[colIdx-1] // @step:compare

			if patternChar == '*' {
				// '*' matches empty sequence (dp[rowIdx][colIdx-1]) or one more char (dp[rowIdx-1][colIdx])
				matchEmpty := dp[rowIdx][colIdx-1] // @step:compute-distance
				matchOne := dp[rowIdx-1][colIdx] // @step:compute-distance
				if matchEmpty == 1 || matchOne == 1 {
					dp[rowIdx][colIdx] = 1 // @step:compute-distance
				} else {
					dp[rowIdx][colIdx] = 0 // @step:compute-distance
				}
			} else if patternChar == '?' || patternChar == textChar {
				// '?' matches any single char, or exact character match
				dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1] // @step:compute-distance
			} else {
				dp[rowIdx][colIdx] = 0 // @step:compute-distance
			}
		}
	}

	return dp[textLength][patternLength] == 1 // @step:complete
}
