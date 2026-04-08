// Find All Duplicates — find all elements that appear twice using a hash set
package main

func findAllDuplicates(numbers []int) []int {
	seenSet := make(map[int]bool) // @step:initialize
	duplicates := []int{}
	for _, currentNum := range numbers {
		if seenSet[currentNum] {
			// @step:check-duplicate
			duplicates = append(duplicates, currentNum) // @step:key-found
		} else {
			seenSet[currentNum] = true // @step:insert-key
		}
	}
	return duplicates // @step:complete
}
