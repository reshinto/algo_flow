// Recursive Binary Search — halve the search range via recursive calls
package main

func recursiveBinarySearch(sortedArray []int, targetValue int) int {
	// @step:initialize
	var searchRange func(lowIndex, highIndex int) int // @step:initialize
	searchRange = func(lowIndex, highIndex int) int {
		// @step:initialize
		if lowIndex > highIndex {
			// @step:complete
			return -1 // @step:complete
		}

		midIndex := lowIndex + (highIndex-lowIndex)/2 // @step:compare
		midValue := sortedArray[midIndex]             // @step:compare

		if midValue == targetValue {
			// @step:compare,found
			return midIndex // @step:found
		} else if midValue < targetValue {
			// @step:eliminate
			// Target is in the upper half — discard the lower half
			return searchRange(midIndex+1, highIndex) // @step:eliminate
		} else {
			// @step:eliminate
			// Target is in the lower half — discard the upper half
			return searchRange(lowIndex, midIndex-1) // @step:eliminate
		}
	}

	return searchRange(0, len(sortedArray)-1) // @step:complete
}
