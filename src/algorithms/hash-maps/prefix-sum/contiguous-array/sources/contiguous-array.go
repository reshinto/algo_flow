// Contiguous Array — find the longest subarray with equal number of 0s and 1s
package main

func contiguousArray(numbers []int) int {
	prefixSumMap := make(map[int]int) // @step:initialize
	prefixSumMap[0] = -1
	runningSum := 0
	maxLength := 0
	for elementIndex, num := range numbers {
		if num == 0 {
			runningSum-- // @step:check-prefix
		} else {
			runningSum++ // @step:check-prefix
		}
		if previousIndex, exists := prefixSumMap[runningSum]; exists {
			subarrayLength := elementIndex - previousIndex // @step:prefix-found
			if subarrayLength > maxLength {
				maxLength = subarrayLength
			}
		} else {
			prefixSumMap[runningSum] = elementIndex // @step:insert-key
		}
	}
	return maxLength // @step:complete
}
