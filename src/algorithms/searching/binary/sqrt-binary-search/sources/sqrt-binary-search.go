// Square Root via Binary Search — find the integer square root of a non-negative number
package main

func sqrtBinarySearch(targetValue int) int {
	// @step:initialize
	if targetValue < 2 {
		return targetValue // @step:initialize
	}
	lowIndex := 1             // @step:initialize
	highIndex := targetValue / 2 // @step:initialize
	resultIndex := 0          // @step:initialize

	for lowIndex <= highIndex {
		midIndex := lowIndex + (highIndex-lowIndex)/2 // @step:compare
		midSquared := midIndex * midIndex             // @step:compare

		if midSquared == targetValue {
			// @step:compare,found
			return midIndex // @step:found
		} else if midSquared < targetValue {
			// @step:eliminate
			// midIndex is a candidate floor — search for a larger value
			resultIndex = midIndex    // @step:eliminate
			lowIndex = midIndex + 1   // @step:eliminate
		} else {
			// @step:eliminate
			// midIndex is too large — search left
			highIndex = midIndex - 1 // @step:eliminate
		}
	}

	return resultIndex // @step:complete
}
