// Quick Sort 3-Way — Dutch National Flag partitioning: < pivot | = pivot | > pivot
package main

func partition3Way(sortedArray []int, low int, high int) {
	if low >= high {
		return // @step:partition
	}

	pivotValue := sortedArray[low]    // @step:partition
	lessThanPointer := low            // @step:partition
	greaterThanPointer := high        // @step:partition
	currentPointer := low             // @step:partition

	// Dutch National Flag partitioning
	for currentPointer <= greaterThanPointer {
		// @step:compare
		if sortedArray[currentPointer] < pivotValue {
			// @step:compare
			sortedArray[lessThanPointer], sortedArray[currentPointer] = sortedArray[currentPointer], sortedArray[lessThanPointer] // @step:swap
			lessThanPointer++  // @step:swap
			currentPointer++   // @step:swap
		} else if sortedArray[currentPointer] > pivotValue {
			// @step:compare
			sortedArray[greaterThanPointer], sortedArray[currentPointer] = sortedArray[currentPointer], sortedArray[greaterThanPointer] // @step:swap
			greaterThanPointer-- // @step:swap
			// Do not advance currentPointer — recheck the swapped element
		} else {
			currentPointer++ // @step:compare
		}
	}

	// Elements at [lessThanPointer..greaterThanPointer] are equal to pivot — mark as placed
	// @step:pivot-placed

	// Recursively sort the less-than and greater-than partitions
	partition3Way(sortedArray, low, lessThanPointer-1)      // @step:mark-sorted
	partition3Way(sortedArray, greaterThanPointer+1, high)  // @step:mark-sorted
}

func quickSort3Way(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize

	if len(sortedArray) > 1 {
		partition3Way(sortedArray, 0, len(sortedArray)-1)
	}

	return sortedArray // @step:complete
}
