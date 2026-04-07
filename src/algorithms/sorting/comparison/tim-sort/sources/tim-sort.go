// Tim Sort — hybrid of insertion sort for small runs + merge sort to combine them
package main

const minRunSize = 4

func insertionSortRun(sortedArray []int, runStart, runEnd int) {
	// @step:insertion-pass
	for outerIndex := runStart + 1; outerIndex <= runEnd; outerIndex++ {
		// @step:insertion-pass
		currentValue := sortedArray[outerIndex] // @step:insertion-pass
		innerIndex := outerIndex - 1            // @step:insertion-pass

		for innerIndex >= runStart && sortedArray[innerIndex] > currentValue {
			// @step:compare
			sortedArray[innerIndex+1] = sortedArray[innerIndex] // @step:swap
			innerIndex--                                        // @step:swap
		}
		sortedArray[innerIndex+1] = currentValue // @step:swap
	}
}

func mergeRuns(sortedArray []int, leftStart, midPoint, rightEnd int) {
	// @step:merge
	leftSlice := make([]int, midPoint-leftStart+1)         // @step:merge
	rightSlice := make([]int, rightEnd-midPoint)           // @step:merge
	copy(leftSlice, sortedArray[leftStart:midPoint+1])     // @step:merge
	copy(rightSlice, sortedArray[midPoint+1:rightEnd+1])   // @step:merge

	leftPointer := 0       // @step:merge
	rightPointer := 0      // @step:merge
	mergeIndex := leftStart // @step:merge

	for leftPointer < len(leftSlice) && rightPointer < len(rightSlice) {
		// @step:compare
		if leftSlice[leftPointer] <= rightSlice[rightPointer] {
			// @step:compare
			sortedArray[mergeIndex] = leftSlice[leftPointer] // @step:merge
			leftPointer++                                    // @step:merge
		} else {
			sortedArray[mergeIndex] = rightSlice[rightPointer] // @step:merge
			rightPointer++                                     // @step:merge
		}
		mergeIndex++ // @step:merge
	}

	for leftPointer < len(leftSlice) {
		sortedArray[mergeIndex] = leftSlice[leftPointer] // @step:merge
		leftPointer++                                    // @step:merge
		mergeIndex++                                     // @step:merge
	}

	for rightPointer < len(rightSlice) {
		sortedArray[mergeIndex] = rightSlice[rightPointer] // @step:merge
		rightPointer++                                     // @step:merge
		mergeIndex++                                       // @step:merge
	}
}

func timSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	// Sort individual runs using insertion sort
	for runStart := 0; runStart < arrayLength; runStart += minRunSize {
		// @step:insertion-pass
		runEnd := runStart + minRunSize - 1 // @step:insertion-pass
		if runEnd >= arrayLength {
			runEnd = arrayLength - 1
		}
		insertionSortRun(sortedArray, runStart, runEnd) // @step:insertion-pass
	}

	// Merge sorted runs in increasing size
	for mergeSize := minRunSize; mergeSize < arrayLength; mergeSize *= 2 {
		// @step:merge
		for leftStart := 0; leftStart < arrayLength; leftStart += 2 * mergeSize {
			// @step:merge
			midPoint := leftStart + mergeSize - 1 // @step:merge
			if midPoint >= arrayLength {
				midPoint = arrayLength - 1
			}
			rightEnd := leftStart + 2*mergeSize - 1 // @step:merge
			if rightEnd >= arrayLength {
				rightEnd = arrayLength - 1
			}

			if midPoint < rightEnd {
				mergeRuns(sortedArray, leftStart, midPoint, rightEnd) // @step:merge
			}
		}
	}

	// @step:mark-sorted
	return sortedArray // @step:complete
}
