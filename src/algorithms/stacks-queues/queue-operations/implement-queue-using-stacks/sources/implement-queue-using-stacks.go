// Implement Queue Using Stacks — use two stacks to emulate FIFO queue behaviour (LeetCode 232)
package main

import "fmt"

func implementQueueUsingStacks(values []int) []int {
	inputStack := []int{} // @step:initialize
	outputStack := []int{} // @step:initialize
	dequeueResults := []int{} // @step:initialize

	// Push phase — enqueue all values into the input stack
	for elementIdx := 0; elementIdx < len(values); elementIdx++ {
		currentValue := values[elementIdx] // @step:visit
		inputStack = append(inputStack, currentValue) // @step:push
	}

	// Dequeue phase — transfer when output stack is empty, then pop
	for len(inputStack) > 0 || len(outputStack) > 0 {
		if len(outputStack) == 0 {
			// Transfer all elements from input stack to output stack
			for len(inputStack) > 0 {
				transferredValue := inputStack[len(inputStack)-1] // @step:transfer
				inputStack = inputStack[:len(inputStack)-1]
				outputStack = append(outputStack, transferredValue) // @step:transfer
			}
		}
		dequeuedValue := outputStack[len(outputStack)-1] // @step:pop
		outputStack = outputStack[:len(outputStack)-1]
		dequeueResults = append(dequeueResults, dequeuedValue) // @step:pop
	}

	return dequeueResults // @step:complete
}

func main() {
	fmt.Println(implementQueueUsingStacks([]int{1, 2, 3, 4}))
}
