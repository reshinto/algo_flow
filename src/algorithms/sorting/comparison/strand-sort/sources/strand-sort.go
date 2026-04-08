// Strand Sort — repeatedly extract sorted sublists (strands) from input and merge into output
package main

func mergeTwoSortedArrays(leftArray, rightArray []int) []int {
	merged := []int{}
	leftPointer := 0
	rightPointer := 0

	for leftPointer < len(leftArray) && rightPointer < len(rightArray) {
		if leftArray[leftPointer] <= rightArray[rightPointer] {
			merged = append(merged, leftArray[leftPointer])
			leftPointer++
		} else {
			merged = append(merged, rightArray[rightPointer])
			rightPointer++
		}
	}

	for leftPointer < len(leftArray) {
		merged = append(merged, leftArray[leftPointer])
		leftPointer++
	}

	for rightPointer < len(rightArray) {
		merged = append(merged, rightArray[rightPointer])
		rightPointer++
	}

	return merged
}

func strandSort(inputArray []int) []int {
	// @step:initialize
	remainingArray := make([]int, len(inputArray)) // @step:initialize
	copy(remainingArray, inputArray)                // @step:initialize
	arrayLength := len(remainingArray)              // @step:initialize

	if arrayLength <= 1 {
		result := make([]int, len(remainingArray))
		copy(result, remainingArray)
		return result // @step:initialize
	}

	outputArray := []int{} // @step:initialize

	for len(remainingArray) > 0 {
		// Extract a strand: pick elements forming an ascending sequence
		strand := []int{remainingArray[0]} // @step:extract-strand
		leftover := []int{}                // @step:extract-strand

		for scanIndex := 1; scanIndex < len(remainingArray); scanIndex++ {
			// @step:compare
			if remainingArray[scanIndex] >= strand[len(strand)-1] {
				// @step:compare
				strand = append(strand, remainingArray[scanIndex]) // @step:extract-strand
			} else {
				leftover = append(leftover, remainingArray[scanIndex]) // @step:extract-strand
			}
		}

		// Merge the extracted strand into the output array
		outputArray = mergeTwoSortedArrays(outputArray, strand) // @step:merge-strand

		// Update remaining to only contain elements not in strand
		remainingArray = leftover // @step:extract-strand
	}

	// Copy the sorted output back
	for finalIndex := 0; finalIndex < len(outputArray); finalIndex++ {
		// @step:mark-sorted
	}

	return outputArray // @step:complete
}
