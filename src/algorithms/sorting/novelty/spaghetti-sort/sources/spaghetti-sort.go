// Spaghetti Sort — find and remove tallest strand repeatedly (analogous to physical spaghetti rods)
package main

func spaghettiSort(inputArray []int) []int {
	// @step:initialize
	originalArray := make([]int, len(inputArray)) // @step:initialize
	copy(originalArray, inputArray)               // @step:initialize
	arrayLength := len(originalArray)             // @step:initialize

	// Simulate "holding up spaghetti bundles": work with a copy
	remainingStrands := make([]int, len(originalArray)) // @step:initialize
	copy(remainingStrands, originalArray)               // @step:initialize
	sortedResult := []int{}                             // @step:initialize

	// Repeatedly find and remove the tallest strand (maximum element)
	for extractionPass := 0; extractionPass < arrayLength; extractionPass++ {
		// @step:find-tallest
		tallestIndex := 0                    // @step:find-tallest
		tallestValue := remainingStrands[0]  // @step:find-tallest

		// Scan all remaining strands to find the tallest
		for scanIndex := 1; scanIndex < len(remainingStrands); scanIndex++ {
			// @step:compare
			if remainingStrands[scanIndex] > tallestValue {
				// @step:compare
				tallestIndex = scanIndex              // @step:compare
				tallestValue = remainingStrands[scanIndex] // @step:compare
			}
		}

		// Remove the tallest strand and place it at the front of the sorted result
		remainingStrands = append(remainingStrands[:tallestIndex], remainingStrands[tallestIndex+1:]...) // @step:swap
		sortedResult = append([]int{tallestValue}, sortedResult...)                                       // @step:swap — prepend max to build result in ascending order

		// @step:mark-sorted
	}

	return sortedResult // @step:complete
}
