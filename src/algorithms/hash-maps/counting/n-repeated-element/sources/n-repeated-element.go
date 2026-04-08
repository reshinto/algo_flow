// N-Repeated Element — find the element repeated n times in an array of size 2n
package main

func nRepeatedElement(numbers []int) int {
	frequencyMap := make(map[int]int) // @step:initialize
	targetCount := len(numbers) / 2
	for _, currentNum := range numbers {
		frequencyMap[currentNum]++              // @step:increment-count
		updatedCount := frequencyMap[currentNum]
		if updatedCount == targetCount {
			return currentNum // @step:key-found
		}
	}
	return -1 // @step:complete
}
