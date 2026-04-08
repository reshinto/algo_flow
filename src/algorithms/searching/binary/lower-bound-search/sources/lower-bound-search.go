// Lower Bound Search — find the first position where element >= target
package main

func lowerBoundSearch(sortedArray []int, targetValue int) int {
	// @step:initialize
	lowIndex := 0                 // @step:initialize
	highIndex := len(sortedArray) // @step:initialize
	resultIndex := len(sortedArray) // @step:initialize

	for lowIndex < highIndex {
		midIndex := lowIndex + (highIndex-lowIndex)/2 // @step:compare
		midValue := sortedArray[midIndex]             // @step:compare

		if midValue >= targetValue {
			// @step:compare,found
			// midValue is a candidate — record it and search for an earlier occurrence
			resultIndex = midIndex  // @step:found
			highIndex = midIndex    // @step:eliminate
		} else {
			// @step:eliminate
			// midValue is too small — the lower bound must be to the right
			lowIndex = midIndex + 1 // @step:eliminate
		}
	}

	return resultIndex // @step:complete
}
