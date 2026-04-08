// Dual-Pivot Quick Sort — two pivots create three partitions: < pivot1 | pivot1..pivot2 | > pivot2
package main

func dualPivotPartition(sortedArray []int, low int, high int) {
	if low >= high {
		return // @step:partition
	}

	// Ensure pivot1 <= pivot2
	if sortedArray[low] > sortedArray[high] {
		// @step:partition
		sortedArray[low], sortedArray[high] = sortedArray[high], sortedArray[low] // @step:partition
	}

	pivot1 := sortedArray[low]  // @step:partition
	pivot2 := sortedArray[high] // @step:partition

	lessThanPointer := low + 1   // @step:partition
	greaterThanPointer := high - 1 // @step:partition
	currentPointer := low + 1   // @step:partition

	for currentPointer <= greaterThanPointer {
		// @step:compare
		if sortedArray[currentPointer] < pivot1 {
			// @step:compare
			sortedArray[lessThanPointer], sortedArray[currentPointer] = sortedArray[currentPointer], sortedArray[lessThanPointer] // @step:swap
			lessThanPointer++                                                                                                      // @step:swap
			currentPointer++                                                                                                       // @step:swap
		} else if sortedArray[currentPointer] > pivot2 {
			// @step:compare
			// Find the rightmost non-greater element
			for greaterThanPointer > currentPointer && sortedArray[greaterThanPointer] > pivot2 {
				// @step:compare
				greaterThanPointer-- // @step:compare
			}
			sortedArray[greaterThanPointer], sortedArray[currentPointer] = sortedArray[currentPointer], sortedArray[greaterThanPointer] // @step:swap
			greaterThanPointer--                                                                                                         // @step:swap
			// Recheck currentPointer
		} else {
			currentPointer++ // @step:compare
		}
	}

	// Place pivot1 and pivot2 in their final positions
	lessThanPointer--   // @step:pivot-placed
	greaterThanPointer++ // @step:pivot-placed

	sortedArray[low], sortedArray[lessThanPointer] = sortedArray[lessThanPointer], sortedArray[low]    // @step:pivot-placed
	sortedArray[high], sortedArray[greaterThanPointer] = sortedArray[greaterThanPointer], sortedArray[high] // @step:pivot-placed

	// Both pivots are now at their final sorted positions
	// @step:mark-sorted

	// Recursively sort three partitions
	dualPivotPartition(sortedArray, low, lessThanPointer-1)         // @step:mark-sorted
	dualPivotPartition(sortedArray, lessThanPointer+1, greaterThanPointer-1) // @step:mark-sorted
	dualPivotPartition(sortedArray, greaterThanPointer+1, high)     // @step:mark-sorted
}

func dualPivotQuickSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize

	if len(sortedArray) > 1 {
		dualPivotPartition(sortedArray, 0, len(sortedArray)-1)
	}

	return sortedArray // @step:complete
}
