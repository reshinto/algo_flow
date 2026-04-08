// Find Peak Element — binary search on slope to find a peak in O(log n)
package main

func findPeakElement(array []int) int {
	// @step:initialize
	lowIndex := 0             // @step:initialize
	highIndex := len(array) - 1 // @step:initialize

	for lowIndex < highIndex {
		midIndex := lowIndex + (highIndex-lowIndex)/2 // @step:compare
		midValue := array[midIndex]                   // @step:compare
		nextValue := array[midIndex+1]                // @step:compare

		if midValue < nextValue {
			// @step:eliminate
			// Slope is ascending — peak must be to the right
			lowIndex = midIndex + 1 // @step:eliminate
		} else {
			// @step:eliminate
			// Slope is descending or flat — peak is at mid or to the left
			highIndex = midIndex // @step:eliminate
		}
	}

	return lowIndex // @step:found,complete
}
