// Longest Common Substring
// Finds the length of the longest substring shared by both source and target.
// Uses DP: dp[rowIdx][colIdx] = length of longest common substring ending at
// source[rowIdx-1] and target[colIdx-1]. Resets to 0 on mismatch.
// Time: O(nm), Space: O(nm) where n = source.length, m = target.length

package main

func longestCommonSubstring(source string, target string) int {
	sourceChars := []rune(source)
	targetChars := []rune(target)
	sourceLength := len(sourceChars) // @step:initialize
	targetLength := len(targetChars) // @step:initialize

	// Allocate (sourceLength+1) × (targetLength+1) DP matrix, all zeros
	dp := make([][]int, sourceLength+1) // @step:initialize
	for rowIdx := range dp {
		dp[rowIdx] = make([]int, targetLength+1)
	}

	maxLength := 0 // @step:initialize

	// Fill interior cells — no base case rows needed; row/col 0 stay 0
	for rowIdx := 1; rowIdx <= sourceLength; rowIdx++ {
		for colIdx := 1; colIdx <= targetLength; colIdx++ {
			sourceChar := sourceChars[rowIdx-1] // @step:compare
			targetChar := targetChars[colIdx-1] // @step:compare

			if sourceChar == targetChar {
				// Characters match — extend the common substring ending here
				dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1] + 1 // @step:compute-distance
				if dp[rowIdx][colIdx] > maxLength {
					maxLength = dp[rowIdx][colIdx] // @step:compute-distance
				}
			} else {
				// Mismatch — common substring cannot extend through this cell
				dp[rowIdx][colIdx] = 0 // @step:compute-distance
			}
		}
	}

	return maxLength // @step:complete
}
