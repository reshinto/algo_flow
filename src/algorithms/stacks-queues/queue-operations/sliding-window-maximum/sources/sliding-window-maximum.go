// Sliding Window Maximum — find the max in each window of size k using a monotonic deque of indices
package main

import "fmt"

func slidingWindowMaxMonotonic(nums []int, windowSize int) []int {
	deque := []int{} // @step:initialize
	result := []int{} // @step:initialize
	for elementIdx := 0; elementIdx < len(nums); elementIdx++ {
		// @step:visit
		// Remove indices that have fallen outside the current window
		for len(deque) > 0 && deque[0] <= elementIdx-windowSize { // @step:dequeue
			deque = deque[1:] // @step:dequeue
		}
		// Maintain monotonic decreasing order — remove smaller elements from the rear
		for len(deque) > 0 && nums[deque[len(deque)-1]] <= nums[elementIdx] { // @step:maintain-monotonic
			deque = deque[:len(deque)-1] // @step:maintain-monotonic
		}
		deque = append(deque, elementIdx) // @step:enqueue
		// Once the first full window is reached, record the maximum (front of deque)
		if elementIdx >= windowSize-1 { // @step:peek
			result = append(result, nums[deque[0]]) // @step:peek
		}
	}
	return result // @step:complete
}

func main() {
	nums := []int{1, 3, -1, -3, 5, 3, 6, 7}
	fmt.Println(slidingWindowMaxMonotonic(nums, 3))
}
