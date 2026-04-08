// American Flag Sort — in-place MSD radix sort: count digit frequencies, compute offsets, permute in-place
package main

func americanFlagPass(arr []int, start, end, divisor, base int) {
	if end-start <= 1 || divisor < 1 {
		return
	}

	// Count digit frequencies
	counts := make([]int, base) // @step:count
	for countIndex := start; countIndex < end; countIndex++ {
		// @step:extract-digit,compare
		digit := (arr[countIndex] / divisor) % base // @step:extract-digit,compare
		counts[digit]++                             // @step:count
	}

	// Compute bucket offsets (prefix sums)
	offsets := make([]int, base) // @step:count
	offsets[0] = start           // @step:count
	for offsetIndex := 1; offsetIndex < base; offsetIndex++ {
		offsets[offsetIndex] = offsets[offsetIndex-1] + counts[offsetIndex-1] // @step:count
	}

	// Track bucket boundaries for sub-range recursion
	boundaries := make([]int, base) // @step:count
	copy(boundaries, offsets)

	// Permute elements in-place into correct buckets
	for bucketDigit := 0; bucketDigit < base; bucketDigit++ {
		bucketEnd := boundaries[bucketDigit] + counts[bucketDigit] // @step:swap
		for offsets[bucketDigit] < bucketEnd {
			// @step:swap
			currentPos := offsets[bucketDigit]        // @step:swap
			digit := (arr[currentPos] / divisor) % base // @step:extract-digit
			if digit == bucketDigit {
				offsets[bucketDigit]++ // @step:swap
			} else {
				swapTarget := offsets[digit]                               // @step:swap
				arr[currentPos], arr[swapTarget] = arr[swapTarget], arr[currentPos] // @step:swap
				offsets[digit]++                                           // @step:swap
			}
		}
	}

	// Recursively sort each bucket by the next digit
	if divisor > 1 {
		nextDivisor := divisor / base // @step:mark-sorted
		for recursiveDigit := 0; recursiveDigit < base; recursiveDigit++ {
			if counts[recursiveDigit] > 1 {
				americanFlagPass(
					arr,
					boundaries[recursiveDigit],
					boundaries[recursiveDigit]+counts[recursiveDigit],
					nextDivisor,
					base,
				) // @step:mark-sorted
			}
		}
	}
}

func americanFlagSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	if arrayLength <= 1 {
		return sortedArray // @step:complete
	}

	// Shift all values to be non-negative
	minValue := sortedArray[0] // @step:initialize
	for _, val := range sortedArray {
		if val < minValue {
			minValue = val
		}
	}
	offset := 0 // @step:initialize
	if minValue < 0 {
		offset = -minValue
	}
	for shiftIndex := 0; shiftIndex < arrayLength; shiftIndex++ {
		sortedArray[shiftIndex] += offset // @step:initialize
	}

	maxValue := sortedArray[0] // @step:initialize
	for _, val := range sortedArray {
		if val > maxValue {
			maxValue = val
		}
	}
	digitBase := 10  // @step:initialize
	digitDivisor := 1 // @step:initialize
	for maxValue/digitDivisor >= digitBase {
		digitDivisor *= digitBase // @step:initialize
	}

	// Process MSD (most significant digit) first, recursively refine
	americanFlagPass(sortedArray, 0, arrayLength, digitDivisor, digitBase)

	// Shift values back
	for unshiftIndex := 0; unshiftIndex < arrayLength; unshiftIndex++ {
		sortedArray[unshiftIndex] -= offset // @step:mark-sorted
	}

	return sortedArray // @step:complete
}
