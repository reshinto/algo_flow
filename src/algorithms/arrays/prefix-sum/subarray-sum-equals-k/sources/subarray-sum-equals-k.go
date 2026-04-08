// Subarray Sum Equals K — O(n) via prefix sum + hash map
package subarraysumequalk

func subarraySumEqualsK(inputArray []int, target int) (int, [][2]int) {
	prefixSumMap := map[int]int{} // @step:initialize
	prefixSumMap[0] = 1          // @step:initialize

	runningSum := 0      // @step:initialize
	foundCount := 0      // @step:initialize
	subarrays := [][2]int{} // @step:initialize

	for scanIndex := 0; scanIndex < len(inputArray); scanIndex++ {
		runningSum += inputArray[scanIndex] // @step:visit

		lookupKey := runningSum - target // @step:compare

		if matchCount, exists := prefixSumMap[lookupKey]; exists { // @step:compare
			foundCount += matchCount                                     // @step:compare
			subarrays = append(subarrays, [2]int{lookupKey, scanIndex}) // @step:compare
		}

		prefixSumMap[runningSum]++ // @step:visit
	}

	return foundCount, subarrays // @step:complete
}
