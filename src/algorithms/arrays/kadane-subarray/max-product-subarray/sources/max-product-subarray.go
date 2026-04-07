// Max Product Subarray — O(n) tracking both max and min products to handle negative flips
package maxproductsubarray

func maxProductSubarray(inputArray []int) (maxProduct int, startIndex int, endIndex int) {
	arrayLength := len(inputArray)

	if arrayLength == 0 {
		// @step:initialize
		return 0, 0, 0 // @step:initialize
	}

	currentMax := inputArray[0] // @step:initialize
	currentMin := inputArray[0] // @step:initialize
	globalMax := inputArray[0]  // @step:initialize
	currentStart := 0
	bestStart := 0
	bestEnd := 0

	for scanIndex := 1; scanIndex < arrayLength; scanIndex++ {
		currentElement := inputArray[scanIndex] // @step:compare

		// When multiplying by a negative, max and min swap roles
		if currentElement < 0 { // @step:compare
			tempMax := currentMax  // @step:compare
			currentMax = currentMin // @step:compare
			currentMin = tempMax   // @step:compare
		}

		// Extend or restart the subarray
		extendMax := currentMax * currentElement
		if currentElement > extendMax {
			currentMax = currentElement // @step:compare
		} else {
			currentMax = extendMax // @step:compare
		}
		extendMin := currentMin * currentElement
		if currentElement < extendMin {
			currentMin = currentElement // @step:compare
		} else {
			currentMin = extendMin // @step:compare
		}

		if currentMax == currentElement { // @step:compare
			currentStart = scanIndex // @step:compare
		}

		if currentMax > globalMax { // @step:compare
			globalMax = currentMax   // @step:compare
			bestStart = currentStart // @step:compare
			bestEnd = scanIndex      // @step:compare
		}
	}

	return globalMax, bestStart, bestEnd // @step:complete
}
