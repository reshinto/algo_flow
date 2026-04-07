// Block Merge Sort (simplified GrailSort) — find natural runs, merge in-place via rotation
package main

func blockMergeSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize
	if arrayLength <= 1 {
		return sortedArray // @step:initialize
	}

	// Find natural ascending runs in the array
	// @step:find-runs
	runBoundaries := []int{0} // @step:find-runs
	for scanIndex := 1; scanIndex < arrayLength; scanIndex++ {
		// @step:compare
		if sortedArray[scanIndex] < sortedArray[scanIndex-1] {
			// @step:compare
			runBoundaries = append(runBoundaries, scanIndex) // @step:find-runs
		}
	}
	runBoundaries = append(runBoundaries, arrayLength) // @step:find-runs

	// Merge runs pairwise until one run covers the full array
	for len(runBoundaries) > 2 {
		nextBoundaries := []int{0} // @step:merge

		for boundaryIndex := 0; boundaryIndex+2 <= len(runBoundaries)-1; boundaryIndex += 2 {
			leftStart := runBoundaries[boundaryIndex]   // @step:merge
			rightStart := runBoundaries[boundaryIndex+1] // @step:merge
			mergeEnd := runBoundaries[boundaryIndex+2]  // @step:merge

			// In-place merge using rotation
			leftPointer := leftStart  // @step:compare
			rightPointer := rightStart // @step:compare

			for leftPointer < rightPointer && rightPointer < mergeEnd {
				// @step:compare
				if sortedArray[leftPointer] <= sortedArray[rightPointer] {
					// @step:compare
					leftPointer++ // @step:compare
				} else {
					// Rotate the element from rightPointer into the correct position
					displacedValue := sortedArray[rightPointer] // @step:rotate

					// Shift elements from leftPointer to rightPointer-1 one position right
					for shiftIndex := rightPointer; shiftIndex > leftPointer; shiftIndex-- {
						// @step:swap
						sortedArray[shiftIndex] = sortedArray[shiftIndex-1] // @step:swap
					}
					sortedArray[leftPointer] = displacedValue // @step:swap
					leftPointer++                             // @step:swap
					rightPointer++                            // @step:swap
				}
			}

			nextBoundaries = append(nextBoundaries, mergeEnd) // @step:merge
		}

		// If there is an odd run left, carry its end boundary over unchanged
		if (len(runBoundaries)-1)%2 == 1 {
			nextBoundaries = append(nextBoundaries, arrayLength) // @step:merge
		}

		runBoundaries = nextBoundaries // @step:merge

		// @step:mark-sorted
	}

	return sortedArray // @step:complete
}
