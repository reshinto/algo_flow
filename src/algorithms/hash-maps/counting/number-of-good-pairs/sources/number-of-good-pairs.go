// Number of Good Pairs — count pairs (i, j) where nums[i] == nums[j] and i < j
package main

func numberOfGoodPairs(numbers []int) int {
	frequencyMap := make(map[int]int) // @step:initialize
	totalPairs := 0
	for _, currentNum := range numbers {
		currentCount := frequencyMap[currentNum]
		totalPairs += currentCount             // @step:key-found
		frequencyMap[currentNum] = currentCount + 1 // @step:increment-count
	}
	return totalPairs // @step:complete
}
