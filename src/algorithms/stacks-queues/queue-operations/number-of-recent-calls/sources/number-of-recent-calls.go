// Number of Recent Calls — count calls in a 3000ms sliding window using a queue (LeetCode 933)
package main

import "fmt"

func numberOfRecentCalls(timestamps []int) []int {
	queue := []int{} // @step:initialize
	results := []int{} // @step:initialize

	for timestampIdx := 0; timestampIdx < len(timestamps); timestampIdx++ {
		currentTimestamp := timestamps[timestampIdx] // @step:visit

		queue = append(queue, currentTimestamp) // @step:enqueue

		// Remove timestamps outside the 3000ms window
		for queue[0] < currentTimestamp-3000 { // @step:dequeue
			queue = queue[1:] // @step:dequeue
		}

		results = append(results, len(queue)) // @step:complete
	}

	return results // @step:complete
}

func main() {
	timestamps := []int{1, 100, 3001, 3002}
	fmt.Println(numberOfRecentCalls(timestamps))
}
