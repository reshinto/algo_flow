// Two Sum — find two indices whose values add up to the target using a hash map
package main

func twoSum(numbers []int, target int) [2]int {
	numMap := make(map[int]int) // @step:initialize
	for idx, current := range numbers {
		complement := target - current // @step:lookup-key
		if storedIdx, exists := numMap[complement]; exists {
			// @step:key-found
			return [2]int{storedIdx, idx} // @step:key-found
		}
		// Complement not found — store current number for future lookups
		numMap[current] = idx // @step:insert-key
	}
	return [2]int{-1, -1} // @step:complete
}
