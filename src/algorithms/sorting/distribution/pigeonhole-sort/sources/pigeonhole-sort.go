// Pigeonhole Sort — place each element in its own hole, then collect in order
package main

func pigeonholeSort(inputArray []int) []int {
	// @step:initialize
	if len(inputArray) == 0 {
		return []int{} // @step:initialize
	}
	workingArray := make([]int, len(inputArray)) // @step:initialize
	copy(workingArray, inputArray)               // @step:initialize
	arrayLength := len(workingArray)             // @step:initialize

	minValue := workingArray[0] // @step:initialize
	maxValue := workingArray[0] // @step:initialize
	for _, val := range workingArray {
		if val < minValue {
			minValue = val
		}
		if val > maxValue {
			maxValue = val
		}
	}
	holeCount := maxValue - minValue + 1 // @step:initialize

	// Create one pigeonhole per distinct value in range
	holes := make([]int, holeCount) // @step:initialize

	// Place each element into its corresponding pigeonhole
	for placeIndex := 0; placeIndex < arrayLength; placeIndex++ {
		// @step:place,compare
		holePosition := workingArray[placeIndex] - minValue // @step:place,compare
		holes[holePosition]++                               // @step:place
	}

	// Collect elements back from pigeonholes in ascending order
	writeIndex := 0 // @step:collect
	for holeIndex := 0; holeIndex < holeCount; holeIndex++ {
		// @step:collect
		for holes[holeIndex] > 0 {
			// @step:collect
			workingArray[writeIndex] = holeIndex + minValue // @step:collect
			writeIndex++                                    // @step:collect
			holes[holeIndex]--                              // @step:collect
		}
	}

	// @step:mark-sorted
	return workingArray // @step:complete
}
