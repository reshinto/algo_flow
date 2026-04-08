// Longest Common Subsequence (LCS)
// Returns the length of the longest subsequence common to both source and target.
// A subsequence preserves relative order but need not be contiguous.
// Time: O(nm), Space: O(nm) where n = source.length, m = target.length

package main

func longestCommonSubsequence(source string, target string) int {
	sourceChars := []rune(source)
	targetChars := []rune(target)
	sourceLength := len(sourceChars) // @step:initialize
	targetLength := len(targetChars) // @step:initialize

	// Allocate (sourceLength+1) × (targetLength+1) DP matrix, all zeroed
	dp := make([][]int, sourceLength+1) // @step:initialize
	for rowIdx := range dp {
		dp[rowIdx] = make([]int, targetLength+1)
	}

	// Base case: dp[0][j] = 0 (LCS of empty string and any string is 0)
	for colIdx := 0; colIdx <= targetLength; colIdx++ {
		dp[0][colIdx] = 0 // @step:fill-table
	}

	// Base case: dp[i][0] = 0 (LCS of any string and empty string is 0)
	for rowIdx := 1; rowIdx <= sourceLength; rowIdx++ {
		dp[rowIdx][0] = 0 // @step:fill-table
	}

	// Fill the rest of the matrix
	for rowIdx := 1; rowIdx <= sourceLength; rowIdx++ {
		for colIdx := 1; colIdx <= targetLength; colIdx++ {
			sourceChar := sourceChars[rowIdx-1] // @step:compare
			targetChar := targetChars[colIdx-1] // @step:compare

			if sourceChar == targetChar {
				// Characters match — extend the LCS by 1
				dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1] + 1 // @step:compute-distance
			} else {
				// Take the best of: skip source char or skip target char
				best := dp[rowIdx-1][colIdx]
				if dp[rowIdx][colIdx-1] > best { best = dp[rowIdx][colIdx-1] }
				dp[rowIdx][colIdx] = best // @step:compute-distance
			}
		}
	}

	return dp[sourceLength][targetLength] // @step:complete
}
