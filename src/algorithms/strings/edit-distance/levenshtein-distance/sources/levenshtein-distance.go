// Levenshtein Distance (edit distance)
// Returns the minimum number of single-character edits (insertions, deletions,
// replacements) required to transform source into target.
// Time: O(nm), Space: O(nm) where n = source.length, m = target.length

package main

func levenshteinDistance(source string, target string) int {
	sourceChars := []rune(source)
	targetChars := []rune(target)
	sourceLength := len(sourceChars) // @step:initialize
	targetLength := len(targetChars) // @step:initialize

	// Allocate (sourceLength+1) × (targetLength+1) DP matrix
	dp := make([][]int, sourceLength+1) // @step:initialize
	for rowIdx := range dp {
		dp[rowIdx] = make([]int, targetLength+1)
	}

	// Base case: transforming empty string to target[0..j-1] requires j insertions
	for colIdx := 0; colIdx <= targetLength; colIdx++ {
		dp[0][colIdx] = colIdx // @step:fill-table
	}

	// Base case: transforming source[0..i-1] to empty string requires i deletions
	for rowIdx := 1; rowIdx <= sourceLength; rowIdx++ {
		dp[rowIdx][0] = rowIdx // @step:fill-table
	}

	// Fill the rest of the matrix
	for rowIdx := 1; rowIdx <= sourceLength; rowIdx++ {
		for colIdx := 1; colIdx <= targetLength; colIdx++ {
			sourceChar := sourceChars[rowIdx-1] // @step:compare
			targetChar := targetChars[colIdx-1] // @step:compare

			if sourceChar == targetChar {
				// Characters match — no new edit needed
				dp[rowIdx][colIdx] = dp[rowIdx-1][colIdx-1] // @step:compute-distance
			} else {
				// Choose the cheapest of: replace, delete, insert
				replaceCost := dp[rowIdx-1][colIdx-1] + 1 // @step:compute-distance
				deleteCost := dp[rowIdx-1][colIdx] + 1 // @step:compute-distance
				insertCost := dp[rowIdx][colIdx-1] + 1 // @step:compute-distance
				minCost := replaceCost
				if deleteCost < minCost { minCost = deleteCost }
				if insertCost < minCost { minCost = insertCost }
				dp[rowIdx][colIdx] = minCost // @step:compute-distance
			}
		}
	}

	return dp[sourceLength][targetLength] // @step:complete
}
