// Bucket Sort — distribute elements into buckets, sort each bucket, then concatenate
package main

func bucketSort(inputArray []int) []int {
	// @step:initialize
	if len(inputArray) == 0 {
		return []int{} // @step:initialize
	}
	workingArray := make([]int, len(inputArray)) // @step:initialize
	copy(workingArray, inputArray)               // @step:initialize
	arrayLength := len(workingArray)             // @step:initialize

	minValue := workingArray[0] // @step:initialize
	maxValue := workingArray[0] // @step:initialize
	for _, val := range workingArray {
		if val < minValue {
			minValue = val
		}
		if val > maxValue {
			maxValue = val
		}
	}
	bucketCount := arrayLength  // @step:initialize
	if bucketCount < 1 {
		bucketCount = 1
	}
	valueRange := maxValue - minValue + 1 // @step:initialize

	// Create empty buckets
	buckets := make([][]int, bucketCount) // @step:initialize
	for idx := range buckets {
		buckets[idx] = []int{}
	}

	// Distribute elements into buckets based on their normalized position
	for distributeIndex := 0; distributeIndex < arrayLength; distributeIndex++ {
		// @step:distribute
		normalizedPosition := workingArray[distributeIndex] - minValue // @step:distribute
		bucketIndex := normalizedPosition * bucketCount / valueRange   // @step:distribute
		if bucketIndex >= bucketCount {
			bucketIndex = bucketCount - 1
		}
		buckets[bucketIndex] = append(buckets[bucketIndex], workingArray[distributeIndex]) // @step:distribute
	}

	// Sort each bucket using insertion sort
	for bucketIndex := 0; bucketIndex < bucketCount; bucketIndex++ {
		// @step:compare
		bucket := buckets[bucketIndex] // @step:compare
		for outerIndex := 1; outerIndex < len(bucket); outerIndex++ {
			// @step:compare
			currentValue := bucket[outerIndex]  // @step:compare
			insertPosition := outerIndex - 1    // @step:compare
			for insertPosition >= 0 && bucket[insertPosition] > currentValue {
				// @step:swap
				bucket[insertPosition+1] = bucket[insertPosition] // @step:swap
				insertPosition--                                  // @step:swap
			}
			bucket[insertPosition+1] = currentValue // @step:swap
		}
		buckets[bucketIndex] = bucket
	}

	// Collect all elements from sorted buckets
	writeIndex := 0 // @step:collect
	for bucketIndex := 0; bucketIndex < bucketCount; bucketIndex++ {
		// @step:collect
		for _, bucketValue := range buckets[bucketIndex] {
			// @step:collect
			workingArray[writeIndex] = bucketValue // @step:collect
			writeIndex++                           // @step:collect
		}
	}

	// @step:mark-sorted
	return workingArray // @step:complete
}
