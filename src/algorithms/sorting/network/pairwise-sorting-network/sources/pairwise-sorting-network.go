// Pairwise Sorting Network — sort adjacent pairs first, then merge via compare-swap with doubling strides
package main

func pairwiseCompareAndSwap(sortedArray []int, firstIndex int, secondIndex int) {
	if firstIndex < len(sortedArray) && secondIndex < len(sortedArray) {
		if sortedArray[firstIndex] > sortedArray[secondIndex] {
			// @step:swap
			sortedArray[firstIndex], sortedArray[secondIndex] = sortedArray[secondIndex], sortedArray[firstIndex] // @step:swap
		}
	}
}

func pairwiseSortingNetwork(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	if arrayLength <= 1 {
		return sortedArray // @step:complete
	}

	// Phase 1: Sort adjacent pairs
	for pairStart := 0; pairStart+1 < arrayLength; pairStart += 2 {
		// @step:compare
		pairwiseCompareAndSwap(sortedArray, pairStart, pairStart+1) // @step:compare
	}

	// Phase 2: Merge using Shell-sort-like gap sequence (powers of 2, decreasing)
	for gap := 2; gap < arrayLength; gap *= 2 {
		// @step:compare
		// Compare elements at distance gap within each merged block
		for blockStart := 0; blockStart < arrayLength; blockStart += gap * 2 {
			// @step:compare
			for offset := 0; offset < gap && blockStart+offset+gap < arrayLength; offset++ {
				// @step:compare
				pairwiseCompareAndSwap(sortedArray, blockStart+offset, blockStart+offset+gap) // @step:compare
			}
		}
		// Reconciliation: fix local inversions created by the block merge
		for reconcileGap := gap / 2; reconcileGap >= 1; reconcileGap /= 2 {
			// @step:compare
			for reconcileStart := reconcileGap; reconcileStart+reconcileGap < arrayLength; reconcileStart += reconcileGap * 2 {
				// @step:compare
				for reconcileOffset := 0; reconcileOffset < reconcileGap && reconcileStart+reconcileOffset < arrayLength-1; reconcileOffset++ {
					// @step:compare
					pairwiseCompareAndSwap(sortedArray, reconcileStart+reconcileOffset, reconcileStart+reconcileOffset+1) // @step:compare
				}
			}
		}
	}

	// Final pass to ensure complete sortedness (odd-even transposition pass)
	swapped := true
	for swapped {
		swapped = false
		for finalIndex := 0; finalIndex+1 < arrayLength; finalIndex++ {
			if sortedArray[finalIndex] > sortedArray[finalIndex+1] {
				pairwiseCompareAndSwap(sortedArray, finalIndex, finalIndex+1)
				swapped = true
			}
		}
	}

	// @step:mark-sorted

	return sortedArray // @step:complete
}
