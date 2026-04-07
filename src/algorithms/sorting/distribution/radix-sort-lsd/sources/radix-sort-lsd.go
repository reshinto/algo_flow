// Radix Sort LSD — sort integers digit by digit from least to most significant
package main

func radixSortLsd(inputArray []int) []int {
	// @step:initialize
	if len(inputArray) == 0 {
		return []int{} // @step:initialize
	}
	workingArray := make([]int, len(inputArray)) // @step:initialize
	copy(workingArray, inputArray)               // @step:initialize
	arrayLength := len(workingArray)             // @step:initialize

	// Offset negatives so all values are non-negative
	minValue := workingArray[0] // @step:initialize
	for _, val := range workingArray {
		if val < minValue {
			minValue = val // @step:initialize
		}
	}
	offset := 0 // @step:initialize
	if minValue < 0 {
		offset = -minValue // @step:initialize
	}
	for offsetIndex := 0; offsetIndex < arrayLength; offsetIndex++ {
		// @step:initialize
		workingArray[offsetIndex] += offset // @step:initialize
	}

	maxValue := workingArray[0] // @step:initialize
	for _, val := range workingArray {
		if val > maxValue {
			maxValue = val // @step:initialize
		}
	}

	// Process each digit position from least significant to most significant
	digitDivisor := 1 // @step:initialize
	for maxValue/digitDivisor > 0 {
		// @step:extract-digit
		base := 10                         // @step:extract-digit
		buckets := make([][]int, base) // @step:extract-digit
		for bucketInit := range buckets {
			buckets[bucketInit] = []int{}
		}

		// Distribute elements into buckets based on current digit
		for distributeIndex := 0; distributeIndex < arrayLength; distributeIndex++ {
			// @step:extract-digit,compare
			digit := (workingArray[distributeIndex] / digitDivisor) % base // @step:extract-digit,compare
			buckets[digit] = append(buckets[digit], workingArray[distributeIndex]) // @step:extract-digit
		}

		// Collect elements back from buckets in order
		writeIndex := 0 // @step:place
		for bucketIndex := 0; bucketIndex < base; bucketIndex++ {
			// @step:place
			for _, bucketValue := range buckets[bucketIndex] {
				// @step:place
				workingArray[writeIndex] = bucketValue // @step:place
				writeIndex++                           // @step:place
			}
		}

		digitDivisor *= base // @step:place
	}

	// Reverse the offset to restore original value range
	for restoreIndex := 0; restoreIndex < arrayLength; restoreIndex++ {
		// @step:mark-sorted
		workingArray[restoreIndex] -= offset // @step:mark-sorted
	}

	return workingArray // @step:complete
}
