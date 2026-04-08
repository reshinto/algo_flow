// First Non-Repeating Char Stream — use a queue as candidate buffer and a frequency map to find the first non-repeating character at each step
package main

import "fmt"

func firstNonRepeatingCharStream(inputString string) []string {
	freqMap := map[rune]int{} // @step:initialize
	queue := []rune{} // @step:initialize
	results := []string{} // @step:initialize
	for _, ch := range inputString {
		// @step:visit
		freqMap[ch]++ // @step:visit
		queue = append(queue, ch) // @step:enqueue
		// Remove repeated characters from the front of the queue
		for len(queue) > 0 && freqMap[queue[0]] > 1 { // @step:dequeue
			queue = queue[1:] // @step:dequeue
		}
		answer := "#"
		if len(queue) > 0 {
			answer = string(queue[0])
		} // @step:peek
		results = append(results, answer) // @step:peek
	}
	return results // @step:complete
}

func main() {
	fmt.Println(firstNonRepeatingCharStream("aabcbc"))
}
