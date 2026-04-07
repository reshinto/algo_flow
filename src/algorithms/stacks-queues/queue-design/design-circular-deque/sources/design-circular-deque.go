// Design Circular Deque — fixed-capacity ring buffer with front/rear insertion and removal (LeetCode 641)
package main

import (
	"fmt"
	"strconv"
	"strings"
)

func designCircularDeque(operations []string, capacity int) []string {
	buffer := make([]*int, capacity) // @step:initialize
	frontIndex := -1 // @step:initialize
	rearIndex := -1 // @step:initialize
	dequeSize := 0 // @step:initialize
	results := []string{} // @step:initialize

	for _, operation := range operations {
		// @step:visit
		if strings.HasPrefix(operation, "pushBack") {
			valueParts := strings.Fields(operation)
			value, _ := strconv.Atoi(valueParts[1]) // @step:enqueue
			if dequeSize == capacity { // @step:enqueue
				results = append(results, "full") // @step:enqueue
			} else {
				if frontIndex == -1 { // @step:enqueue
					frontIndex = 0 // @step:enqueue
				}
				rearIndex = (rearIndex + 1) % capacity // @step:enqueue
				buffer[rearIndex] = &value // @step:enqueue
				dequeSize++ // @step:enqueue
				results = append(results, "true") // @step:enqueue
			}
		} else if strings.HasPrefix(operation, "pushFront") {
			valueParts := strings.Fields(operation)
			value, _ := strconv.Atoi(valueParts[1]) // @step:enqueue-front
			if dequeSize == capacity { // @step:enqueue-front
				results = append(results, "full") // @step:enqueue-front
			} else {
				if frontIndex == -1 { // @step:enqueue-front
					frontIndex = 0 // @step:enqueue-front
					rearIndex = 0 // @step:enqueue-front
				} else {
					frontIndex = (frontIndex - 1 + capacity) % capacity // @step:enqueue-front
				}
				buffer[frontIndex] = &value // @step:enqueue-front
				dequeSize++ // @step:enqueue-front
				results = append(results, "true") // @step:enqueue-front
			}
		} else if operation == "popFront" {
			if dequeSize == 0 { // @step:dequeue
				results = append(results, "empty") // @step:dequeue
			} else {
				poppedValue := *buffer[frontIndex] // @step:dequeue
				buffer[frontIndex] = nil // @step:dequeue
				if frontIndex == rearIndex { // @step:dequeue
					frontIndex = -1 // @step:dequeue
					rearIndex = -1 // @step:dequeue
				} else {
					frontIndex = (frontIndex + 1) % capacity // @step:dequeue
				}
				dequeSize-- // @step:dequeue
				results = append(results, strconv.Itoa(poppedValue)) // @step:dequeue
			}
		} else if operation == "popBack" {
			if dequeSize == 0 { // @step:dequeue-rear
				results = append(results, "empty") // @step:dequeue-rear
			} else {
				poppedValue := *buffer[rearIndex] // @step:dequeue-rear
				buffer[rearIndex] = nil // @step:dequeue-rear
				if frontIndex == rearIndex { // @step:dequeue-rear
					frontIndex = -1 // @step:dequeue-rear
					rearIndex = -1 // @step:dequeue-rear
				} else {
					rearIndex = (rearIndex - 1 + capacity) % capacity // @step:dequeue-rear
				}
				dequeSize-- // @step:dequeue-rear
				results = append(results, strconv.Itoa(poppedValue)) // @step:dequeue-rear
			}
		} else if operation == "peekFront" {
			if frontIndex == -1 { // @step:peek
				results = append(results, "empty") // @step:peek
			} else {
				results = append(results, strconv.Itoa(*buffer[frontIndex])) // @step:peek
			}
		} else if operation == "peekRear" {
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
	ops := []string{"pushBack 1", "pushBack 2", "peekFront", "popFront", "peekRear"}
	fmt.Println(designCircularDeque(ops, 3))
}
