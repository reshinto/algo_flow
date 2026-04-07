// Flash Sort — classify elements into buckets by value range, permute in-place, then insertion sort
package main

import "math"

func flashSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	if arrayLength <= 1 {
		return sortedArray // @step:complete
	}

	// Find min and max to determine the value range
	minValue := sortedArray[0] // @step:initialize
	maxIndex := 0              // @step:initialize
	for scanIndex := 1; scanIndex < arrayLength; scanIndex++ {
		if sortedArray[scanIndex] < minValue {
			minValue = sortedArray[scanIndex] // @step:initialize
		}
		if sortedArray[scanIndex] > sortedArray[maxIndex] {
			maxIndex = scanIndex // @step:initialize
		}
	}

	if sortedArray[maxIndex] == minValue {
		return sortedArray // @step:complete
	}

	// Number of classes — roughly n/5 or 1, bounded
	classCount := int(math.Floor(0.45*float64(arrayLength))) // @step:initialize
	if classCount < 1 {
		classCount = 1
	}
	classVector := make([]int, classCount)                                                   // @step:initialize
	scaleFactor := float64(classCount-1) / float64(sortedArray[maxIndex]-minValue) // @step:initialize

	// Classify — count how many elements fall in each class
	for classifyIndex := 0; classifyIndex < arrayLength; classifyIndex++ {
		// @step:classify
		classIndex := int(scaleFactor * float64(sortedArray[classifyIndex]-minValue)) // @step:classify
		classVector[classIndex]++                                                      // @step:classify
	}

	// Compute prefix sums (class upper boundaries)
	for prefixIndex := 1; prefixIndex < classCount; prefixIndex++ {
		// @step:classify
		classVector[prefixIndex] += classVector[prefixIndex-1] // @step:classify
	}

	// Swap the maximum element to the front temporarily
	sortedArray[0], sortedArray[maxIndex] = sortedArray[maxIndex], sortedArray[0] // @step:swap

	// Permutation phase — cycle sort within classes
	cycleIndex := 0        // @step:swap
	permutationsDone := 0  // @step:swap

	for permutationsDone < arrayLength-1 {
		// @step:swap
		currentClass := int(scaleFactor * float64(sortedArray[cycleIndex]-minValue))
		for cycleIndex >= classVector[currentClass]-1 {
			// @step:compare
			cycleIndex++ // @step:compare
			if cycleIndex < arrayLength {
				currentClass = int(scaleFactor * float64(sortedArray[cycleIndex]-minValue))
			}
		}
		holdValue := sortedArray[cycleIndex]                                          // @step:swap
		targetClass := int(scaleFactor * float64(holdValue-minValue))                 // @step:swap

		for cycleIndex != classVector[targetClass]-1 {
			// @step:swap
			targetClass = int(scaleFactor * float64(holdValue-minValue)) // @step:swap
			targetPosition := classVector[targetClass] - 1               // @step:swap
			flashTemp := sortedArray[targetPosition]                     // @step:swap
			sortedArray[targetPosition] = holdValue                      // @step:swap
			holdValue = flashTemp                                        // @step:swap
			classVector[targetClass]--                                   // @step:swap
			permutationsDone++                                           // @step:swap
		}
		// Place the final held value at cycleIndex to complete this cycle
		sortedArray[cycleIndex] = holdValue // @step:swap
		permutationsDone++                  // @step:swap
	}

	// Insertion sort pass to clean up small disorder within classes
	for outerIndex := 1; outerIndex < arrayLength; outerIndex++ {
		// @step:insertion-pass
		currentValue := sortedArray[outerIndex] // @step:insertion-pass
		insertPosition := outerIndex - 1        // @step:insertion-pass

		for insertPosition >= 0 && sortedArray[insertPosition] > currentValue {
			// @step:compare
			sortedArray[insertPosition+1] = sortedArray[insertPosition] // @step:swap
			insertPosition--                                            // @step:swap
		}
		sortedArray[insertPosition+1] = currentValue // @step:mark-sorted
	}

	return sortedArray // @step:complete
}
