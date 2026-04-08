// Proxmap Sort — proximity map sorting: map each element to its approximate final position, then insertion sort locally
package main

func proxmapSort(inputArray []int) []int {
	// @step:initialize
	sourceArray := make([]int, len(inputArray)) // @step:initialize
	copy(sourceArray, inputArray)               // @step:initialize
	arrayLength := len(sourceArray)             // @step:initialize

	if arrayLength <= 1 {
		return sourceArray // @step:complete
	}

	minValue := sourceArray[0] // @step:initialize
	maxValue := sourceArray[0] // @step:initialize
	for _, val := range sourceArray {
		if val < minValue {
			minValue = val // @step:initialize
		}
		if val > maxValue {
			maxValue = val // @step:initialize
		}
	}

	if minValue == maxValue {
		return sourceArray // @step:complete
	}

	valueRange := float64(maxValue - minValue)              // @step:initialize
	scaleFactor := float64(arrayLength-1) / valueRange // @step:initialize

	// Build proxmap — count how many elements map to each position
	hitCount := make([]int, arrayLength) // @step:map-position
	for mapIndex := 0; mapIndex < arrayLength; mapIndex++ {
		// @step:map-position
		mappedPosition := int(scaleFactor * float64(sourceArray[mapIndex]-minValue)) // @step:map-position
		hitCount[mappedPosition]++                                                    // @step:map-position
	}

	// Compute starting positions for each cluster (prefix sums)
	startPosition := make([]int, arrayLength) // @step:map-position
	runningTotal := 0                         // @step:map-position
	for posIndex := 0; posIndex < arrayLength; posIndex++ {
		// @step:map-position
		startPosition[posIndex] = runningTotal // @step:map-position
		runningTotal += hitCount[posIndex]     // @step:map-position
	}

	// Insert each element into the output array near its mapped position
	outputArray := make([]int, arrayLength)  // @step:compare
	nextSlot := make([]int, arrayLength)     // @step:compare
	copy(nextSlot, startPosition)            // @step:compare

	for insertIndex := 0; insertIndex < arrayLength; insertIndex++ {
		// @step:compare
		currentValue := sourceArray[insertIndex]                                          // @step:compare
		mappedPosition := int(scaleFactor * float64(currentValue-minValue))               // @step:compare
		slotIndex := nextSlot[mappedPosition]                                             // @step:compare

		// Insertion sort within the cluster to maintain order
		for slotIndex > startPosition[mappedPosition] && outputArray[slotIndex-1] > currentValue {
			// @step:compare
			outputArray[slotIndex] = outputArray[slotIndex-1] // @step:swap
			slotIndex--                                        // @step:swap
		}
		outputArray[slotIndex] = currentValue // @step:swap
		nextSlot[mappedPosition]++            // @step:swap
	}

	// Copy sorted output back to source array
	for copyIndex := 0; copyIndex < arrayLength; copyIndex++ {
		sourceArray[copyIndex] = outputArray[copyIndex] // @step:mark-sorted
	}

	return sourceArray // @step:complete
}
