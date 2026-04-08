// Radix Sort MSD — sort integers digit by digit from most to least significant (recursive)
package main

func sortByDigit(subArray []int, digitDivisor int, base int) []int {
	// @step:extract-digit
	if len(subArray) <= 1 || digitDivisor < 1 {
		return subArray // @step:extract-digit
	}

	buckets := make([][]int, base) // @step:extract-digit
	for bucketInit := range buckets {
		buckets[bucketInit] = []int{}
	}

	for _, value := range subArray {
		// @step:extract-digit,compare
		digit := (value / digitDivisor) % base // @step:extract-digit,compare
		buckets[digit] = append(buckets[digit], value) // @step:extract-digit
	}

	result := []int{} // @step:place
	for bucketIndex := 0; bucketIndex < base; bucketIndex++ {
		// @step:place
		sortedBucket := sortByDigit(buckets[bucketIndex], digitDivisor/base, base) // @step:place
		for _, bucketValue := range sortedBucket {
			// @step:place
			result = append(result, bucketValue) // @step:place
		}
	}

	return result // @step:place
}

func radixSortMsd(inputArray []int) []int {
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
	base := 10 // @step:initialize

	// Determine the highest digit position
	maxDivisor := 1 // @step:initialize
	for maxDivisor*base <= maxValue {
		// @step:initialize
		maxDivisor *= base // @step:initialize
	}

	sorted := sortByDigit(workingArray, maxDivisor, base)

	// Restore offset
	for restoreIndex := 0; restoreIndex < arrayLength; restoreIndex++ {
		// @step:mark-sorted
		sorted[restoreIndex] -= offset // @step:mark-sorted
	}

	return sorted // @step:complete
}
