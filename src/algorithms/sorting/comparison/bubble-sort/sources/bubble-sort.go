// Bubble Sort — repeatedly swap adjacent out-of-order elements
package main

func bubbleSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	for outerIndex := 0; outerIndex < arrayLength-1; outerIndex++ {
		// @step:outer-loop,mark-sorted
		swappedThisPass := false // @step:outer-loop

		// Each pass bubbles the next-largest element into its final position
		for innerIndex := 0; innerIndex < arrayLength-1-outerIndex; innerIndex++ {
			// @step:inner-loop
			if sortedArray[innerIndex] > sortedArray[innerIndex+1] {
				// @step:compare
				temporaryValue := sortedArray[innerIndex]      // @step:swap
				sortedArray[innerIndex] = sortedArray[innerIndex+1] // @step:swap
				sortedArray[innerIndex+1] = temporaryValue     // @step:swap
				swappedThisPass = true                         // @step:swap
			}
		}

		// No swaps means the array is already sorted — exit early for O(n) best case
		if !swappedThisPass {
			break // @step:early-exit
		}
	}

	return sortedArray // @step:complete
}
