// Design Circular Queue — fixed-capacity ring buffer with front/rear pointers (LeetCode 622)
package main

import (
	"fmt"
	"strconv"
	"strings"
)

func designCircularQueue(operations []string, capacity int) []string {
	buffer := make([]*int, capacity) // @step:initialize
	frontIndex := -1 // @step:initialize
	rearIndex := -1 // @step:initialize
	queueSize := 0 // @step:initialize
	results := []string{} // @step:initialize

	for _, operation := range operations {
		// @step:visit
		if strings.HasPrefix(operation, "enqueue") {
			valueParts := strings.Fields(operation)
			value, _ := strconv.Atoi(valueParts[1]) // @step:enqueue
			if queueSize == capacity { // @step:enqueue
				results = append(results, "full") // @step:enqueue
			} else {
				if frontIndex == -1 { // @step:enqueue
					frontIndex = 0 // @step:enqueue
				}
				rearIndex = (rearIndex + 1) % capacity // @step:enqueue
				buffer[rearIndex] = &value // @step:enqueue
				queueSize++ // @step:enqueue
				results = append(results, "true") // @step:enqueue
			}
		} else if operation == "dequeue" {
			if queueSize == 0 { // @step:dequeue
				results = append(results, "empty") // @step:dequeue
			} else {
				dequeuedValue := *buffer[frontIndex] // @step:dequeue
				buffer[frontIndex] = nil // @step:dequeue
				if frontIndex == rearIndex { // @step:dequeue
					frontIndex = -1 // @step:dequeue
					rearIndex = -1 // @step:dequeue
				} else {
					frontIndex = (frontIndex + 1) % capacity // @step:dequeue
				}
				queueSize-- // @step:dequeue
				results = append(results, strconv.Itoa(dequeuedValue)) // @step:dequeue
			}
		} else if operation == "front" {
			if frontIndex == -1 { // @step:peek
				results = append(results, "empty") // @step:peek
			} else {
				results = append(results, strconv.Itoa(*buffer[frontIndex])) // @step:peek
			}
		} else if operation == "rear" {
			if rearIndex == -1 { // @step:peek
				results = append(results, "empty") // @step:peek
			} else {
				results = append(results, strconv.Itoa(*buffer[rearIndex])) // @step:peek
			}
		}
	}

	return results // @step:complete
}

func main() {
	ops := []string{"enqueue 1", "enqueue 2", "front", "dequeue", "rear"}
	fmt.Println(designCircularQueue(ops, 3))
}
