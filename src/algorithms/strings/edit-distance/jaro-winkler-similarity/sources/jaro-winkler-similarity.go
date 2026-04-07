// Jaro-Winkler Similarity
// Computes similarity between two strings using the Jaro formula,
// then boosts the score if the strings share a common prefix (up to 4 chars).
// Returns a value between 0.0 (completely dissimilar) and 1.0 (identical).
// Time: O(nm), Space: O(n) where n and m are the string lengths.

package main

import "math"

func jaroWinklerSimilarity(source string, target string) float64 {
	sourceChars := []rune(source)
	targetChars := []rune(target)
	sourceLength := len(sourceChars) // @step:initialize
	targetLength := len(targetChars) // @step:initialize

	// Identical strings have similarity 1.0
	if source == target { return 1.0 } // @step:initialize

	// Either empty string has similarity 0.0
	if sourceLength == 0 || targetLength == 0 { return 0.0 } // @step:initialize

	// Match window: characters within this distance can be considered matching
	maxLen := sourceLength
	if targetLength > maxLen {
		maxLen = targetLength
	}
	matchWindow := maxLen/2 - 1 // @step:initialize

	sourceMatched := make([]bool, sourceLength) // @step:initialize
	targetMatched := make([]bool, targetLength) // @step:initialize

	matchCount := 0 // @step:initialize

	// Find matching characters within the match window
	for sourceIdx := 0; sourceIdx < sourceLength; sourceIdx++ {
		// @step:compare
		windowStart := sourceIdx - matchWindow // @step:compare
		if windowStart < 0 { windowStart = 0 }
		windowEnd := sourceIdx + matchWindow // @step:compare
		if windowEnd >= targetLength { windowEnd = targetLength - 1 }

		for targetIdx := windowStart; targetIdx <= windowEnd; targetIdx++ {
			// @step:compare
			if !targetMatched[targetIdx] && sourceChars[sourceIdx] == targetChars[targetIdx] {
				// @step:compare
				sourceMatched[sourceIdx] = true // @step:compute-distance
				targetMatched[targetIdx] = true // @step:compute-distance
				matchCount++ // @step:compute-distance
				break
			}
		}
	}

	// No matches means similarity is 0
	if matchCount == 0 { return 0.0 } // @step:compute-distance

	// Count transpositions: matched chars in different order
	transpositionCount := 0 // @step:compute-distance
	targetScanIdx := 0 // @step:compute-distance

	for sourceIdx := 0; sourceIdx < sourceLength; sourceIdx++ {
		// @step:compute-distance
		if !sourceMatched[sourceIdx] { continue } // @step:compute-distance

		for !targetMatched[targetScanIdx] {
			// @step:compute-distance
			targetScanIdx++ // @step:compute-distance
		}

		if sourceChars[sourceIdx] != targetChars[targetScanIdx] {
			// @step:compute-distance
			transpositionCount++ // @step:compute-distance
		}

		targetScanIdx++ // @step:compute-distance
	}

	// Jaro similarity formula
	halfTranspositions := float64(transpositionCount) / 2.0 // @step:compute-distance
	jaroScore :=
		(float64(matchCount)/float64(sourceLength) + // @step:compute-distance
			float64(matchCount)/float64(targetLength) + // @step:compute-distance
			(float64(matchCount)-halfTranspositions)/float64(matchCount)) / // @step:compute-distance
		3.0 // @step:compute-distance

	// Count common prefix length (up to 4 characters)
	maxPrefixLength := 4 // @step:compute-distance
	prefixLength := 0 // @step:compute-distance

	minLen := maxPrefixLength
	if sourceLength < minLen { minLen = sourceLength }
	if targetLength < minLen { minLen = targetLength }

	for prefixIdx := 0; prefixIdx < minLen; prefixIdx++ {
		// @step:compute-distance
		if sourceChars[prefixIdx] == targetChars[prefixIdx] {
			// @step:compute-distance
			prefixLength++ // @step:compute-distance
		} else {
			break // @step:compute-distance
		}
	}

	// Winkler bonus: reward common prefix
	winklerBonus := float64(prefixLength) * 0.1 * (1.0 - jaroScore) // @step:compute-distance
	jaroWinklerScore := jaroScore + winklerBonus // @step:compute-distance

	return math.Round(jaroWinklerScore*10000) / 10000 // @step:complete
}
