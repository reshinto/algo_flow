// Counting Sort — count occurrences of each value, then place elements in sorted order
package main

func countingSortDistribution(inputArray []int) []int {
	// @step:initialize
	if len(inputArray) == 0 {
		return []int{} // @step:initialize
	}
	workingArray := make([]int, len(inputArray)) // @step:initialize
	copy(workingArray, inputArray)               // @step:initialize
	arrayLength := len(workingArray)             // @step:initialize

	// Find the range of values
	minValue := workingArray[0] // @step:initialize
	maxValue := workingArray[0] // @step:initialize
	for scanIndex := 1; scanIndex < arrayLength; scanIndex++ {
		// @step:initialize
		if workingArray[scanIndex] < minValue {
			minValue = workingArray[scanIndex] // @step:initialize
		}
		if workingArray[scanIndex] > maxValue {
			maxValue = workingArray[scanIndex] // @step:initialize
		}
	}

	valueRange := maxValue - minValue + 1 // @step:initialize
	countArray := make([]int, valueRange)  // @step:initialize

	// Count occurrences of each value
	for countIndex := 0; countIndex < arrayLength; countIndex++ {
		// @step:count,compare
		bucketPosition := workingArray[countIndex] - minValue // @step:count,compare
		countArray[bucketPosition]++                          // @step:count
	}

	// Place elements back into the array in sorted order
	writeIndex := 0 // @step:place
	for valueIndex := 0; valueIndex < valueRange; valueIndex++ {
		// @step:place
		for countArray[valueIndex] > 0 {
			// @step:place
			workingArray[writeIndex] = valueIndex + minValue // @step:place
			writeIndex++                                     // @step:place
			countArray[valueIndex]--                         // @step:place
		}
	}

	// @step:mark-sorted
	return workingArray // @step:complete
}
