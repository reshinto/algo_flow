// Longest Consecutive Sequence — find the length of the longest consecutive run using a hash set
package main

func longestConsecutiveSequence(numbers []int) int {
	numSet := make(map[int]bool) // @step:initialize
	for _, num := range numbers {
		numSet[num] = true // @step:insert-key
	}
	maxLength := 0
	for _, currentNumber := range numbers {
		if !numSet[currentNumber-1] {
			// @step:lookup-key
			// This number is a sequence start — count forward
			sequenceLength := 1
			nextNumber := currentNumber + 1
			for numSet[nextNumber] {
				// @step:key-found
				sequenceLength++
				nextNumber++
			}
			if sequenceLength > maxLength {
				maxLength = sequenceLength // @step:key-not-found
			}
		}
	}
	return maxLength // @step:complete
}
