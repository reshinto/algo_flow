// Trapping Rain Water — O(n) two-pointer approach
package trappingrainwater

func trappingRainWater(heights []int) (totalWater int, waterPerIndex []int) {
	arrayLength := len(heights)
	if arrayLength == 0 {
		// @step:initialize
		return 0, []int{} // @step:initialize
	}

	leftPointer := 0               // @step:initialize
	rightPointer := arrayLength - 1 // @step:initialize
	maxLeft := 0                   // @step:initialize
	maxRight := 0                  // @step:initialize
	totalWater = 0                 // @step:initialize
	waterPerIndex = make([]int, arrayLength) // @step:initialize

	for leftPointer < rightPointer {
		if heights[leftPointer] <= heights[rightPointer] { // @step:compare
			if heights[leftPointer] >= maxLeft { // @step:compare
				maxLeft = heights[leftPointer] // @step:visit
			} else {
				waterPerIndex[leftPointer] = maxLeft - heights[leftPointer] // @step:visit
				totalWater += waterPerIndex[leftPointer]                    // @step:visit
			}
			leftPointer++ // @step:visit
		} else {
			if heights[rightPointer] >= maxRight { // @step:compare
				maxRight = heights[rightPointer] // @step:visit
			} else {
				waterPerIndex[rightPointer] = maxRight - heights[rightPointer] // @step:visit
				totalWater += waterPerIndex[rightPointer]                       // @step:visit
			}
			rightPointer-- // @step:visit
		}
	}

	return totalWater, waterPerIndex // @step:complete
}
