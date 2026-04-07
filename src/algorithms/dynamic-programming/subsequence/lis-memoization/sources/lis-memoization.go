// LIS (Longest Increasing Subsequence) memoization — top-down recursion with cached subproblems

package main

import "fmt"

func lisHelper(sequence []int, startIndex int, memo map[int]int) int {
	if cached, found := memo[startIndex]; found {
		return cached // @step:read-cache
	}
	// @step:push-call
	maxLength := 1 // @step:compute-cell
	sequenceLength := len(sequence)
	for nextIndex := startIndex + 1; nextIndex < sequenceLength; nextIndex++ {
		// @step:compute-cell
		if sequence[nextIndex] > sequence[startIndex] {
			// @step:compute-cell
			subLength := 1 + lisHelper(sequence, nextIndex, memo) // @step:compute-cell
			if subLength > maxLength {
				// @step:compute-cell
				maxLength = subLength // @step:compute-cell
			}
		}
	}
	memo[startIndex] = maxLength // @step:compute-cell
	return maxLength             // @step:pop-call
}

func lisMemoization(sequence []int) int {
	// @step:initialize
	sequenceLength := len(sequence) // @step:initialize
	if sequenceLength == 0 {
		return 0 // @step:initialize
	}
	memo := make(map[int]int) // @step:initialize
	result := 0               // @step:compute-cell
	for startIndex := 0; startIndex < sequenceLength; startIndex++ {
		// @step:compute-cell
		lisLength := lisHelper(sequence, startIndex, memo) // @step:compute-cell
		if lisLength > result {
			// @step:compute-cell
			result = lisLength // @step:compute-cell
		}
	}
	return result // @step:complete
}

func main() {
	sequence := []int{10, 9, 2, 5, 3, 7, 101, 18}
	result := lisMemoization(sequence)
	fmt.Printf("LIS length of %v: %d\n", sequence, result)
}
