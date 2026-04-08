// Container With Most Water — two pointers converge inward, always moving the shorter bar to maximize area
package containerwithmostwater

func containerWithMostWater(heights []int) (maxArea int, leftIndex int, rightIndex int) {
	leftPointer := 0               // @step:initialize
	rightPointer := len(heights) - 1 // @step:initialize
	maxArea = 0                    // @step:initialize
	bestLeft := 0                  // @step:initialize
	bestRight := len(heights) - 1  // @step:initialize

	for leftPointer < rightPointer {
		leftHeight := heights[leftPointer]   // @step:visit
		rightHeight := heights[rightPointer] // @step:visit
		minHeight := leftHeight
		if rightHeight < minHeight {
			minHeight = rightHeight
		}
		currentArea := minHeight * (rightPointer - leftPointer) // @step:compare

		if currentArea > maxArea { // @step:compare
			maxArea = currentArea    // @step:compare
			bestLeft = leftPointer   // @step:compare
			bestRight = rightPointer // @step:compare
		}

		if leftHeight <= rightHeight { // @step:compare
			leftPointer++ // @step:visit
		} else {
			rightPointer-- // @step:visit
		}
	}

	return maxArea, bestLeft, bestRight // @step:complete
}
