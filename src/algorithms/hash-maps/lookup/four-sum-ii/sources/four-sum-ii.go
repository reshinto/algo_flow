// Four Sum II — count tuples (i,j,k,l) such that A[i]+B[j]+C[k]+D[l] == 0
package main

func fourSumII(numsA []int, numsB []int, numsC []int, numsD []int) int {
	pairSumCounts := make(map[int]int) // @step:initialize

	// Phase 1: build map of all A+B pair sums with their occurrence counts
	for _, outerVal := range numsA {
		for _, innerVal := range numsB {
			pairSum := outerVal + innerVal
			if _, exists := pairSumCounts[pairSum]; exists {
				pairSumCounts[pairSum]++ // @step:increment-count
			} else {
				pairSumCounts[pairSum] = 1 // @step:insert-key
			}
		}
	}

	// Phase 2: for each C+D pair, check if its negation exists in the map
	tupleCount := 0
	for _, outerVal := range numsC {
		for _, innerVal := range numsD {
			complement := -(outerVal + innerVal)
			if count, exists := pairSumCounts[complement]; exists {
				// @step:key-found
				tupleCount += count // @step:key-found
			}
			// @step:key-not-found
		}
	}

	return tupleCount // @step:complete
}
