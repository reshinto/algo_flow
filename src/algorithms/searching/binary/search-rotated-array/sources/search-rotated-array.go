// Search in Rotated Sorted Array — binary search adapted for a rotated sorted array
package main

func searchRotatedArray(sortedArray []int, targetValue int) int {
	// @step:initialize
	lowIndex := 0                      // @step:initialize
	highIndex := len(sortedArray) - 1  // @step:initialize

	for lowIndex <= highIndex {
		midIndex := lowIndex + (highIndex-lowIndex)/2 // @step:compare
		midValue := sortedArray[midIndex]             // @step:compare

		if midValue == targetValue {
			// @step:compare,found
			return midIndex // @step:found
		}

		// Determine which half is sorted
		lowValue := sortedArray[lowIndex]
		if lowValue <= midValue {
			// @step:compare
			// Left half is sorted
			if lowValue <= targetValue && targetValue < midValue {
				// @step:eliminate
				// Target is within the sorted left half
				highIndex = midIndex - 1 // @step:eliminate
			} else {
				// @step:eliminate
				// Target is in the right half
				lowIndex = midIndex + 1 // @step:eliminate
			}
		} else {
			// @step:compare
			// Right half is sorted
			highValue := sortedArray[highIndex]
			if midValue < targetValue && targetValue <= highValue {
				// @step:eliminate
				// Target is within the sorted right half
				lowIndex = midIndex + 1 // @step:eliminate
			} else {
				// @step:eliminate
				// Target is in the left half
				highIndex = midIndex - 1 // @step:eliminate
			}
		}
	}

	return -1 // @step:complete
}
