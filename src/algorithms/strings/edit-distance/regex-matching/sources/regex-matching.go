// Regular Expression Matching
// Determines if text matches a pattern that may contain '.' (any single character)
// or '*' (zero or more of the preceding element).
// Uses dynamic programming: dp[rowIdx][colIdx] = true if text[0..rowIdx-1] matches pattern[0..colIdx-1].
// Time: O(nm), Space: O(nm) where n = text.length, m = pattern.length

package main

func regexMatching(text string, pattern string) bool {
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

	// Base case: empty text can match patterns like "a*", "a*b*", etc.
	for colIdx := 2; colIdx <= patternLength; colIdx++ {
		if patternChars[colIdx-1] == '*' {
			dp[0][colIdx] = dp[0][colIdx-2] // @step:fill-table
		}
	}

	// Fill the rest of the matrix
	for rowIdx := 1; rowIdx <= textLength; rowIdx++ {
		for colIdx := 1; colIdx <= patternLength; colIdx++ {
			textChar := textChars[rowIdx-1] // @step:compare
			patternChar := patternChars[colIdx-1] // @step:compare

			if patternChar == '*' {
				// '*' with preceding element: zero occurrences (skip two pattern chars) or one more char
				zeroOccurrences := dp[rowIdx][colIdx-2] // @step:compute-distance
				var precedingChar rune
				if colIdx >= 2 { precedingChar = patternChars[colIdx-2] }
				charMatches := precedingChar == '.' || precedingChar == textChar
				oneMore := 0
				if charMatches { oneMore = dp[rowIdx-1][colIdx] } // @step:compute-distance
				if zeroOccurrences == 1 || oneMore == 1 {
					dp[rowIdx][colIdx] = 1 // @step:compute-distance
				} else {
					dp[rowIdx][colIdx] = 0 // @step:compute-distance
				}
			} else if patternChar == '.' || patternChar == textChar {
				// '.' matches any single char, or exact character match
				dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1] // @step:compute-distance
			} else {
				dp[rowIdx][colIdx] = 0 // @step:compute-distance
			}
		}
	}

	return dp[textLength][patternLength] == 1 // @step:complete
}
