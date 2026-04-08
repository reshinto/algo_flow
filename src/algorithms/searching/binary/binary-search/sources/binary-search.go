// Binary Search — halve the search range on each iteration
package main

func binarySearch(sortedArray []int, targetValue int) int {
	// @step:initialize
	lowIndex := 0                      // @step:initialize
	highIndex := len(sortedArray) - 1  // @step:initialize

	for lowIndex <= highIndex {
		midIndex := lowIndex + (highIndex-lowIndex)/2 // @step:compare
		midValue := sortedArray[midIndex]             // @step:compare

		if midValue == targetValue {
			// @step:compare,found
			return midIndex // @step:found
		} else if midValue < targetValue {
			// @step:eliminate
			// Target is in the upper half — discard the lower half
			lowIndex = midIndex + 1 // @step:eliminate
		} else {
			// @step:eliminate
			// Target is in the lower half — discard the upper half
			highIndex = midIndex - 1 // @step:eliminate
		}
	}

	return -1 // @step:complete
}
