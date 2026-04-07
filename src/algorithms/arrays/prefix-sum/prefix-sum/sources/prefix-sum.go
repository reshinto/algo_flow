// Prefix Sum — O(n) build, O(1) per query via prefix difference
package prefixsum

func prefixSum(inputArray []int, queries [][2]int) ([]int, []int) {
	prefixArray := make([]int, len(inputArray)+1) // @step:initialize

	// Build prefix sum array where prefixArray[i] = sum of inputArray[0..i-1]
	for scanIndex := 0; scanIndex < len(inputArray); scanIndex++ { // @step:visit
		prefixArray[scanIndex+1] = prefixArray[scanIndex] + inputArray[scanIndex] // @step:visit
	}

	queryResults := []int{} // @step:compare

	// Answer range queries in O(1) each using prefix difference
	for queryIndex := 0; queryIndex < len(queries); queryIndex++ {
		leftBound := queries[queryIndex][0]
		rightBound := queries[queryIndex][1]
		rangeSum := prefixArray[rightBound+1] - prefixArray[leftBound] // @step:compare
		queryResults = append(queryResults, rangeSum)                   // @step:compare
	}

	return prefixArray[1:], queryResults // @step:complete
}
