// Interleave First Half Queue — interleave the first half of a queue with the second half using a stack
package main

import "fmt"

func interleaveFirstHalfQueue(values []int) []int {
	queue := make([]int, len(values)) // @step:initialize
	copy(queue, values)
	halfSize := len(values) / 2 // @step:initialize
	stack := []int{} // @step:initialize

	// Step 1: Dequeue first half into stack
	for fillIdx := 0; fillIdx < halfSize; fillIdx++ {
		stack = append(stack, queue[0]) // @step:push
		queue = queue[1:]
	}

	// Step 2: Enqueue stack elements back to queue (reverses first half)
	for len(stack) > 0 {
		queue = append(queue, stack[len(stack)-1]) // @step:enqueue
		stack = stack[:len(stack)-1]
	}

	// Step 3: Dequeue second half and enqueue back (move original second half to rear)
	for rotateIdx := 0; rotateIdx < halfSize; rotateIdx++ {
		queue = append(queue, queue[0]) // @step:transfer
		queue = queue[1:]
	}

	// Step 4: Dequeue first half (originally first half, now at front) into stack
	for refillIdx := 0; refillIdx < halfSize; refillIdx++ {
		stack = append(stack, queue[0]) // @step:push
		queue = queue[1:]
	}

	// Step 5: Interleave — alternately pop from stack and dequeue from queue
	result := []int{} // @step:initialize
	for len(stack) > 0 {
		result = append(result, stack[len(stack)-1]) // @step:pop
		stack = stack[:len(stack)-1]
		result = append(result, queue[0]) // @step:dequeue
		queue = queue[1:]
	}
	if len(queue) > 0 {
		result = append(result, queue[0]) // @step:dequeue
	}

	return result // @step:complete
}

func main() {
	fmt.Println(interleaveFirstHalfQueue([]int{1, 2, 3, 4, 5, 6}))
}
