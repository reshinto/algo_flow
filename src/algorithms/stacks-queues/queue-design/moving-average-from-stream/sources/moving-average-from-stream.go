// Moving Average from Data Stream — fixed-size sliding window queue (LeetCode 346)
package main

import "fmt"

func movingAverageFromStream(values []float64, windowSize int) []float64 {
	queue := []float64{} // @step:initialize
	runningSum := 0.0 // @step:initialize
	averages := []float64{} // @step:initialize

	for valueIndex := 0; valueIndex < len(values); valueIndex++ {
		currentValue := values[valueIndex] // @step:visit

		queue = append(queue, currentValue) // @step:enqueue
		runningSum += currentValue // @step:enqueue

		if len(queue) > windowSize { // @step:dequeue
			runningSum -= queue[0] // @step:dequeue
			queue = queue[1:] // @step:dequeue
		}

		averages = append(averages, runningSum/float64(len(queue))) // @step:complete
	}

	return averages // @step:complete
}

func main() {
	values := []float64{1.0, 10.0, 3.0, 5.0}
	fmt.Println(movingAverageFromStream(values, 3))
}
