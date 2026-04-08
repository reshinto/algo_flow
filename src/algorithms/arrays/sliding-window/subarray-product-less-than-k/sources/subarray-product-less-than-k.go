// Subarray Product < K — O(n) variable sliding window counting subarrays with product below threshold
package subarrayproductlessthank

func subarrayProductLessThanK(inputArray []int, threshold int) int {
	if len(inputArray) == 0 || threshold <= 1 {
		// @step:initialize
		return 0 // @step:initialize
	}

	leftPointer := 0   // @step:initialize
	currentProduct := 1
	count := 0

	// Expand the right boundary of the window
	for rightPointer := 0; rightPointer < len(inputArray); rightPointer++ {
		currentProduct *= inputArray[rightPointer] // @step:expand-window

		// Shrink from the left while product meets or exceeds threshold
		for currentProduct >= threshold && leftPointer <= rightPointer { // @step:compare
			currentProduct /= inputArray[leftPointer] // @step:shrink-window
			leftPointer++                              // @step:shrink-window
		}

		// Every subarray ending at rightPointer and starting anywhere in [leftPointer, rightPointer]
		count += rightPointer - leftPointer + 1 // @step:compare
	}

	return count // @step:complete
}
