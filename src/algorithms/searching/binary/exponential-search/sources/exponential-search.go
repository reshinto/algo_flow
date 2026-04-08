// Exponential Search — probe exponentially, then binary search in the bounded range
package main

func exponentialSearch(sortedArray []int, targetValue int) int {
	arrayLength := len(sortedArray) // @step:initialize
	if arrayLength == 0 {
		return -1 // @step:complete
	}

	if sortedArray[0] == targetValue {
		// @step:visit
		return 0 // @step:found
	}

	// Phase 1: exponential probing to find the upper bound
	boundIndex := 1 // @step:visit
	for boundIndex < arrayLength && sortedArray[boundIndex] <= targetValue {
		// @step:visit
		boundIndex = boundIndex * 2 // @step:visit
	}

	// Phase 2: binary search in the range [boundIndex/2, min(boundIndex, length-1)]
	lowIndex := boundIndex / 2 // @step:compare
	highIndex := boundIndex    // @step:compare
	if highIndex > arrayLength-1 {
		highIndex = arrayLength - 1
	}

	for lowIndex <= highIndex {
		midIndex := lowIndex + (highIndex-lowIndex)/2 // @step:compare
		midValue := sortedArray[midIndex]             // @step:compare

		if midValue == targetValue {
			// @step:compare,found
			return midIndex // @step:found
		} else if midValue < targetValue {
			// @step:eliminate
			lowIndex = midIndex + 1 // @step:eliminate
		} else {
			// @step:eliminate
			highIndex = midIndex - 1 // @step:eliminate
		}
	}

	return -1 // @step:complete
}
