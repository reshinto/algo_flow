// Minimum in Rotated Sorted Array — binary search variant finding the rotation pivot
package main

func minRotatedArray(sortedArray []int) int {
	// @step:initialize
	lowIndex := 0                      // @step:initialize
	highIndex := len(sortedArray) - 1  // @step:initialize

	for lowIndex < highIndex {
		midIndex := lowIndex + (highIndex-lowIndex)/2 // @step:compare
		midValue := sortedArray[midIndex]             // @step:compare
		highValue := sortedArray[highIndex]           // @step:compare

		if midValue > highValue {
			// @step:compare,eliminate
			// Minimum is in the right half — discard left including mid
			lowIndex = midIndex + 1 // @step:eliminate
		} else {
			// @step:eliminate
			// Minimum is in the left half or at mid — discard right
			highIndex = midIndex // @step:eliminate
		}
	}

	return sortedArray[lowIndex] // @step:found,complete
}
