// Decode Ways memoization — count decoding possibilities for a digit string top-down

package main

import "fmt"

func decode(digits string, position int, memo map[int]int) int {
	if position == 0 {
		return 1 // @step:fill-table
	}
	if cached, found := memo[position]; found {
		return cached // @step:read-cache
	}
	// @step:push-call
	ways := 0 // @step:compute-cell
	singleDigit := int(digits[position-1] - '0') // @step:compute-cell
	if singleDigit >= 1 && singleDigit <= 9 {
		// @step:compute-cell
		ways += decode(digits, position-1, memo) // @step:compute-cell
	}
	if position >= 2 {
		twoDigitValue := int(digits[position-2]-'0')*10 + int(digits[position-1]-'0') // @step:compute-cell
		if twoDigitValue >= 10 && twoDigitValue <= 26 {
			// @step:compute-cell
			ways += decode(digits, position-2, memo) // @step:compute-cell
		}
	}
	memo[position] = ways // @step:compute-cell
	return ways            // @step:pop-call
}

func decodeWaysMemoization(digits string) int {
	// @step:initialize
	digitCount := len(digits) // @step:initialize
	if digitCount == 0 {
		return 0 // @step:initialize
	}
	memo := make(map[int]int)
	return decode(digits, digitCount, memo) // @step:complete
}

func main() {
	digits := "226"
	result := decodeWaysMemoization(digits)
	fmt.Printf("Decode ways for \"%s\": %d\n", digits, result)
}
