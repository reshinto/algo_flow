// Upper Bound Search — find the first index where element is strictly greater than target
package main

func upperBoundSearch(sortedArray []int, targetValue int) int {
	// @step:initialize
	lowIndex := 0                   // @step:initialize
	highIndex := len(sortedArray)   // @step:initialize
	resultIndex := len(sortedArray) // @step:initialize

	for lowIndex < highIndex {
		midIndex := lowIndex + (highIndex-lowIndex)/2 // @step:compare
		midValue := sortedArray[midIndex]             // @step:compare

		if midValue > targetValue {
			// @step:compare,found
			// midValue is strictly greater — record as candidate and search left
			resultIndex = midIndex  // @step:found
			highIndex = midIndex    // @step:eliminate
		} else {
			// @step:eliminate
			// midValue <= target — upper bound must be to the right
			lowIndex = midIndex + 1 // @step:eliminate
		}
	}

	return resultIndex // @step:complete
}
