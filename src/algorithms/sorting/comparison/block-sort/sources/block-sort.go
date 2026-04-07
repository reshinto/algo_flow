// Block Sort (WikiSort) — in-place stable merge sort using rotation-based merging without extra memory
package main

func reverseSegment(sortedArray []int, startIndex, endIndex int) {
	// @step:rotate
	low := startIndex
	high := endIndex
	for low < high {
		// @step:swap
		sortedArray[low], sortedArray[high] = sortedArray[high], sortedArray[low] // @step:swap
		low++
		high--
	}
}

func rotateLeft(sortedArray []int, leftStart, midPoint, rightEnd int) {
	// @step:rotate
	reverseSegment(sortedArray, leftStart, midPoint-1)
	reverseSegment(sortedArray, midPoint, rightEnd)
	reverseSegment(sortedArray, leftStart, rightEnd)
}

func mergeInPlace(sortedArray []int, runStart, runMid, runEnd int) {
	// @step:merge
	if runStart >= runMid || runMid > runEnd {
		return // @step:merge
	}

	leftPointer := runStart
	rightPointer := runMid

	for leftPointer < rightPointer && rightPointer <= runEnd {
		// @step:compare
		if sortedArray[leftPointer] <= sortedArray[rightPointer] {
			// @step:compare
			leftPointer++ // Left element already in correct position
		} else {
			// Find how far to rotate
			insertionPoint := rightPointer
			for insertionPoint <= runEnd && sortedArray[insertionPoint] < sortedArray[leftPointer] {
				// @step:compare
				insertionPoint++
			}

			// Rotate the segment to bring right-run elements into position
			rightSegmentLength := insertionPoint - rightPointer
			rotateLeft(sortedArray, leftPointer, rightPointer, insertionPoint-1) // @step:rotate

			leftPointer += rightSegmentLength
			rightPointer = insertionPoint
		}
	}
}

func blockSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	if arrayLength <= 1 {
		return sortedArray // @step:initialize
	}

	// Find natural sorted runs in the array
	type runPair struct{ start, end int }
	runs := []runPair{}
	runStart := 0

	for scanIndex := 1; scanIndex < arrayLength; scanIndex++ {
		// @step:find-runs
		if sortedArray[scanIndex] < sortedArray[scanIndex-1] {
			// @step:compare
			runs = append(runs, runPair{runStart, scanIndex - 1}) // @step:find-runs
			runStart = scanIndex
		}
	}
	runs = append(runs, runPair{runStart, arrayLength - 1}) // @step:find-runs

	// Merge adjacent runs iteratively (bottom-up merge sort style)
	for len(runs) > 1 {
		// @step:merge
		mergedRuns := []runPair{}

		for runIndex := 0; runIndex < len(runs); runIndex += 2 {
			if runIndex+1 < len(runs) {
				leftRun := runs[runIndex]
				rightRun := runs[runIndex+1]

				mergeInPlace(sortedArray, leftRun.start, rightRun.start, rightRun.end) // @step:merge

				mergedRuns = append(mergedRuns, runPair{leftRun.start, rightRun.end})
			} else {
				mergedRuns = append(mergedRuns, runs[runIndex])
			}
		}

		runs = mergedRuns
	}

	// Mark all elements as sorted
	for sortedIndex := 0; sortedIndex < arrayLength; sortedIndex++ {
		// @step:mark-sorted
	}

	return sortedArray // @step:complete
}
