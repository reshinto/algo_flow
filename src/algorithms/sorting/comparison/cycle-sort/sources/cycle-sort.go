// Cycle Sort — for each element, count elements smaller than it to find its correct position;
// place it there. Minimizes the number of writes to the array.
package main

func cycleSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	for cycleStart := 0; cycleStart < arrayLength-1; cycleStart++ {
		// @step:count-position
		currentValue := sortedArray[cycleStart] // @step:count-position

		// Find the correct position for currentValue
		correctPosition := cycleStart // @step:count-position
		for scanIndex := cycleStart + 1; scanIndex < arrayLength; scanIndex++ {
			// @step:compare
			if sortedArray[scanIndex] < currentValue {
				// @step:compare
				correctPosition++ // @step:count-position
			}
		}

		// If the item is already in the correct position, skip this cycle
		if correctPosition == cycleStart {
			continue // @step:count-position
		}

		// Skip over duplicates to find the unique insertion point
		for currentValue == sortedArray[correctPosition] {
			// @step:count-position
			correctPosition++ // @step:count-position
		}

		// Place currentValue at its correct position
		displacedValue := sortedArray[correctPosition] // @step:swap
		sortedArray[correctPosition] = currentValue    // @step:swap
		currentValue = displacedValue                  // @step:swap

		// Rotate the rest of the cycle
		for correctPosition != cycleStart {
			// @step:count-position
			correctPosition = cycleStart // @step:count-position

			for scanIndex := cycleStart + 1; scanIndex < arrayLength; scanIndex++ {
				// @step:compare
				if sortedArray[scanIndex] < currentValue {
					// @step:compare
					correctPosition++ // @step:count-position
				}
			}

			for currentValue == sortedArray[correctPosition] {
				// @step:count-position
				correctPosition++ // @step:count-position
			}

			if currentValue != sortedArray[correctPosition] {
				// @step:swap
				nextDisplacedValue := sortedArray[correctPosition] // @step:swap
				sortedArray[correctPosition] = currentValue        // @step:swap
				currentValue = nextDisplacedValue                  // @step:swap
			}
		}

		// @step:mark-sorted
	}

	// @step:mark-sorted
	return sortedArray // @step:complete
}
