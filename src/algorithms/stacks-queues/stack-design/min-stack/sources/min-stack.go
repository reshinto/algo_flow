// Min Stack — maintain a main stack paired with an auxiliary min-tracking stack for O(1) getMin
package main

import "fmt"

func minStack(values []int) int {
	mainStack := []int{} // @step:initialize
	minTracker := []int{} // @step:initialize

	for elementIdx := 0; elementIdx < len(values); elementIdx++ {
		currentValue := values[elementIdx] // @step:visit

		mainStack = append(mainStack, currentValue) // @step:push

		// Maintain auxiliary min stack: duplicate current min if new value is not smaller
		if len(minTracker) == 0 || currentValue <= minTracker[len(minTracker)-1] { // @step:compare
			minTracker = append(minTracker, currentValue) // @step:push-auxiliary
		} else {
			minTracker = append(minTracker, minTracker[len(minTracker)-1]) // @step:push-auxiliary
		}
	}

	// The top of minTracker always holds the current minimum
	return minTracker[len(minTracker)-1] // @step:peek,complete
}

func main() {
	fmt.Println(minStack([]int{-2, 0, -3}))
}
