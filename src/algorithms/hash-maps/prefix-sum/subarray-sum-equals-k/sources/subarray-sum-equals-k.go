// Subarray Sum Equals K — count subarrays whose elements sum to the target using prefix sums and a hash map
package main

func subarraySumEqualsK(numbers []int, target int) int {
	prefixCounts := make(map[int]int) // @step:initialize
	prefixCounts[0] = 1              // @step:initialize
	currentSum := 0
	totalCount := 0
	for _, num := range numbers {
		currentSum += num           // @step:check-prefix
		needed := currentSum - target // @step:check-prefix
		if count, exists := prefixCounts[needed]; exists {
			// @step:prefix-found
			totalCount += count // @step:prefix-found
		}
		// Store the running prefix sum count for future lookups
		prefixCounts[currentSum]++ // @step:increment-count
	}
	return totalCount // @step:complete
}
