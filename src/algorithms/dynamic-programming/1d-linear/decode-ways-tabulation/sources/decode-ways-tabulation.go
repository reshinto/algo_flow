// Decode Ways tabulation — count decoding possibilities for a digit string bottom-up

package main

import "fmt"

func decodeWaysTabulation(digits string) int {
	// @step:initialize
	digitCount := len(digits) // @step:initialize
	if digitCount == 0 {
		return 0 // @step:initialize
	}
	dpTable := make([]int, digitCount+1) // @step:initialize
	dpTable[0] = 1                       // @step:fill-table
	// A string of one digit can be decoded iff it is not '0'
	if digits[0] != '0' {
		dpTable[1] = 1 // @step:fill-table
	}
	for position := 2; position <= digitCount; position++ {
		// @step:read-cache
		singleDigit := int(digits[position-1] - '0') // @step:read-cache
		if singleDigit >= 1 && singleDigit <= 9 {
			// @step:read-cache
			dpTable[position] += dpTable[position-1] // @step:read-cache
		}
		twoDigitValue := int(digits[position-2]-'0')*10 + int(digits[position-1]-'0') // @step:read-cache
		if twoDigitValue >= 10 && twoDigitValue <= 26 {
			// @step:read-cache
			dpTable[position] += dpTable[position-2] // @step:read-cache
		}
		// @step:compute-cell
	}
	return dpTable[digitCount] // @step:complete
}

func main() {
	digits := "226"
	result := decodeWaysTabulation(digits)
	fmt.Printf("Decode ways for \"%s\": %d\n", digits, result)
}
