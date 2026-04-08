// Implement Stack Using Queues — use one queue to emulate LIFO stack behaviour (LeetCode 225)
package main

import "fmt"

func implementStackUsingQueues(values []int) []int {
	queue := []int{} // @step:initialize
	popResults := []int{} // @step:initialize

	// Push phase — enqueue each value, then rotate all prior elements behind it
	for elementIdx := 0; elementIdx < len(values); elementIdx++ {
		currentValue := values[elementIdx] // @step:visit
		queue = append(queue, currentValue) // @step:enqueue
		// Rotate: move every element that was there before the new one to the back
		for rotationIdx := 0; rotationIdx < len(queue)-1; rotationIdx++ {
			transferred := queue[0] // @step:transfer
			queue = queue[1:]
			queue = append(queue, transferred) // @step:transfer
		}
	}

	// Pop phase — front of queue is always the most-recently pushed element (LIFO)
	for len(queue) > 0 {
		poppedValue := queue[0] // @step:dequeue
		queue = queue[1:]
		popResults = append(popResults, poppedValue) // @step:dequeue
	}

	return popResults // @step:complete
}

func main() {
	fmt.Println(implementStackUsingQueues([]int{1, 2, 3, 4}))
}
