// Merge Two Sorted Arrays — O(n+m) merge using two pointers
package mergesortedarrays

func mergeSortedArrays(firstArray []int, secondArray []int) []int {
	merged := []int{}    // @step:initialize
	firstPointer := 0    // @step:initialize
	secondPointer := 0   // @step:initialize

	// Compare front elements from each array, place the smaller into result
	for firstPointer < len(firstArray) && secondPointer < len(secondArray) {
		if firstArray[firstPointer] <= secondArray[secondPointer] { // @step:compare
			merged = append(merged, firstArray[firstPointer]) // @step:visit
			firstPointer++                                     // @step:visit
		} else {
			merged = append(merged, secondArray[secondPointer]) // @step:visit
			secondPointer++                                      // @step:visit
		}
	}

	// Drain remaining elements from whichever array has leftovers
	for firstPointer < len(firstArray) {
		merged = append(merged, firstArray[firstPointer]) // @step:visit
		firstPointer++                                     // @step:visit
	}
	for secondPointer < len(secondArray) {
		merged = append(merged, secondArray[secondPointer]) // @step:visit
		secondPointer++                                      // @step:visit
	}

	return merged // @step:complete
}
