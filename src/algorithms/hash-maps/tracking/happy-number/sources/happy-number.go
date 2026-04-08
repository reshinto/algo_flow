// Happy Number — detect happy numbers using digit-square-sum cycling with a hash set
package main

func digitSquareSum(num int) int {
	total := 0 // @step:initialize
	for num > 0 {
		digit := num % 10
		total += digit * digit
		num /= 10
	}
	return total
}

func happyNumber(startNumber int) bool {
	seen := make(map[int]bool) // @step:initialize
	current := startNumber
	for current != 1 {
		seen[current] = true                // @step:insert-key
		current = digitSquareSum(current)   // @step:process-element
		if seen[current] {
			// @step:check-duplicate
			return false // @step:key-found
		}
	}
	return true // @step:complete
}
