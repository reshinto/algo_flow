// Spread Sort — hybrid distribution sort: distribute into bins by value, then insertion sort small bins
package main

import "math"

func spreadSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	if arrayLength <= 1 {
		return sortedArray // @step:complete
	}

	minValue := sortedArray[0] // @step:initialize
	maxValue := sortedArray[0] // @step:initialize
	for _, val := range sortedArray {
		if val < minValue {
			minValue = val // @step:initialize
		}
		if val > maxValue {
			maxValue = val // @step:initialize
		}
	}

	if minValue == maxValue {
		return sortedArray // @step:complete
	}

	// Number of bins — sqrt(n) is a common heuristic
	binCount := int(math.Max(2.0, math.Ceil(math.Sqrt(float64(arrayLength))))) // @step:initialize
	bins := make([][]int, binCount)                                             // @step:initialize
	for binInit := range bins {
		bins[binInit] = []int{}
	}
	valueRange := float64(maxValue-minValue+1) // @step:initialize

	// Distribute elements into bins based on value
	for distributeIndex := 0; distributeIndex < arrayLength; distributeIndex++ {
		// @step:distribute
		normalizedOffset := float64(sortedArray[distributeIndex] - minValue) // @step:distribute
		binIndex := int((normalizedOffset / valueRange) * float64(binCount)) // @step:distribute
		if binIndex >= binCount {
			binIndex = binCount - 1 // @step:distribute
		}
		bins[binIndex] = append(bins[binIndex], sortedArray[distributeIndex]) // @step:distribute
	}

	// Process each bin — insertion sort for small bins
	writeIndex := 0 // @step:compare
	for binIndex := 0; binIndex < binCount; binIndex++ {
		bin := bins[binIndex] // @step:compare
		if len(bin) == 0 {
			continue // @step:compare
		}

		// Insertion sort within the bin
		for outerIndex := 1; outerIndex < len(bin); outerIndex++ {
			// @step:compare
			currentValue := bin[outerIndex]        // @step:compare
			insertPosition := outerIndex - 1       // @step:compare
			for insertPosition >= 0 && bin[insertPosition] > currentValue {
				// @step:compare
				bin[insertPosition+1] = bin[insertPosition] // @step:swap
				insertPosition--                            // @step:swap
			}
			bin[insertPosition+1] = currentValue // @step:swap
		}

		// Write sorted bin back to the main array
		for _, binValue := range bin {
			sortedArray[writeIndex] = binValue // @step:mark-sorted
			writeIndex++                       // @step:mark-sorted
		}
	}

	return sortedArray // @step:complete
}
