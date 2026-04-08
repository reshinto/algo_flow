// Majority Element — find the element that appears more than n/2 times using a frequency map
package main

func majorityElement(numbers []int) int {
	frequencyMap := make(map[int]int) // @step:initialize
	threshold := len(numbers) / 2    // @step:initialize
	for _, currentNum := range numbers {
		frequencyMap[currentNum]++                // @step:increment-count
		updatedCount := frequencyMap[currentNum]  // @step:increment-count
		if updatedCount > threshold {
			return currentNum // @step:key-found
		}
	}
	return -1 // @step:complete
}
