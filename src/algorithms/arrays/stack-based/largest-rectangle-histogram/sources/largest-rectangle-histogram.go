// Largest Rectangle in Histogram — O(n) monotonic stack approach
package largestrectanglehistogram

func largestRectangleHistogram(heights []int) (maxArea int, leftIndex int, rightIndex int, height int) {
	arrayLength := len(heights)
	if arrayLength == 0 {
		// @step:initialize
		return 0, -1, -1, 0 // @step:initialize
	}

	indexStack := []int{} // @step:initialize
	maxArea = 0           // @step:initialize
	bestLeft := 0         // @step:initialize
	bestRight := 0        // @step:initialize
	bestHeight := 0       // @step:initialize

	for currentIndex := 0; currentIndex <= arrayLength; currentIndex++ {
		currentHeight := 0 // @step:compare
		if currentIndex < arrayLength {
			currentHeight = heights[currentIndex]
		}

		for len(indexStack) > 0 && currentHeight < heights[indexStack[len(indexStack)-1]] { // @step:compare
			poppedIndex := indexStack[len(indexStack)-1]              // @step:visit
			indexStack = indexStack[:len(indexStack)-1]
			poppedHeight := heights[poppedIndex]                       // @step:visit
			leftBoundary := 0                                          // @step:visit
			if len(indexStack) > 0 {
				leftBoundary = indexStack[len(indexStack)-1] + 1
			}
			width := currentIndex - leftBoundary                       // @step:visit
			area := poppedHeight * width                               // @step:visit

			if area > maxArea { // @step:compare
				maxArea = area                   // @step:visit
				bestLeft = leftBoundary          // @step:visit
				bestRight = currentIndex - 1     // @step:visit
				bestHeight = poppedHeight        // @step:visit
			}
		}

		indexStack = append(indexStack, currentIndex) // @step:visit
	}

	return maxArea, bestLeft, bestRight, bestHeight // @step:complete
}
