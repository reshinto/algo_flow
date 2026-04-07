// XOR Range Query — O(n) build, O(1) per query via prefix XOR difference
package xorrangequery

func xorRangeQuery(inputArray []int, queries [][2]int) ([]int, []int) {
	prefixXor := make([]int, len(inputArray)+1) // @step:initialize

	// Build prefix XOR array where prefixXor[i] = XOR of inputArray[0..i-1]
	for buildIndex := 0; buildIndex < len(inputArray); buildIndex++ { // @step:visit
		prefixXor[buildIndex+1] = prefixXor[buildIndex] ^ inputArray[buildIndex] // @step:visit
	}

	queryResults := []int{} // @step:compare

	// Answer range XOR queries in O(1) each using prefix XOR difference
	for queryIndex := 0; queryIndex < len(queries); queryIndex++ {
		leftBound := queries[queryIndex][0]
		rightBound := queries[queryIndex][1]
		rangeXor := prefixXor[rightBound+1] ^ prefixXor[leftBound] // @step:compare
		queryResults = append(queryResults, rangeXor)               // @step:compare
	}

	return prefixXor[1:], queryResults // @step:complete
}
