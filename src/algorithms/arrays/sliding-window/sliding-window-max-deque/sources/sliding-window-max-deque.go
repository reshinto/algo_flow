// Sliding Window Maximum (Deque) — O(n) monotonic decreasing deque
package slidingwindowmaxdeque

func slidingWindowMaxDeque(inputArray []int, windowSize int) []int {
	arrayLength := len(inputArray)
	if arrayLength == 0 || windowSize <= 0 || windowSize > arrayLength {
		// @step:initialize
		return []int{} // @step:initialize
	}

	result := []int{}  // @step:initialize
	deque := []int{}   // @step:initialize — stores indices, front = max of current window

	for currentIndex := 0; currentIndex < arrayLength; currentIndex++ {
		// Remove indices outside the current window from the front
		for len(deque) > 0 && deque[0] < currentIndex-windowSize+1 { // @step:compare
			deque = deque[1:] // @step:visit
		}

		// Remove indices of elements smaller than the current element from the back
		for len(deque) > 0 && inputArray[deque[len(deque)-1]] < inputArray[currentIndex] { // @step:compare
			deque = deque[:len(deque)-1] // @step:visit
		}

		deque = append(deque, currentIndex) // @step:visit

		// The window is fully formed once currentIndex >= windowSize - 1
		if currentIndex >= windowSize-1 { // @step:compare
			result = append(result, inputArray[deque[0]]) // @step:visit
		}
	}

	return result // @step:complete
}
