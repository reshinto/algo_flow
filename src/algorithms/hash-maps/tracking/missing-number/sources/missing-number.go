// Missing Number — find the missing number in range [0, n] using a hash set
package main

func missingNumber(numbers []int) int {
	numberSet := make(map[int]bool) // @step:initialize
	for _, num := range numbers {
		numberSet[num] = true // @step:insert-key
	}
	for checkValue := 0; checkValue <= len(numbers); checkValue++ {
		if !numberSet[checkValue] {
			// @step:lookup-key
			return checkValue // @step:key-not-found
		}
	}
	return -1 // @step:complete
}
