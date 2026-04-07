// Remove K Digits — greedy monotonic stack to produce the smallest number after k removals
package main

import (
	"fmt"
	"strings"
)

func removeKDigits(num string, removalCount int) string {
	digitStack := []byte{} // @step:initialize
	removalsLeft := removalCount // @step:initialize

	for digitIdx := 0; digitIdx < len(num); digitIdx++ {
		currentDigit := num[digitIdx] // @step:visit
		// While we still have removals and the stack top is greater than the current digit, pop it
		for removalsLeft > 0 && len(digitStack) > 0 && digitStack[len(digitStack)-1] > currentDigit { // @step:compare
			digitStack = digitStack[:len(digitStack)-1] // @step:pop
			removalsLeft-- // @step:maintain-monotonic
		}
		digitStack = append(digitStack, currentDigit) // @step:push
	}

	// Remove remaining digits from the end if we still have removals left
	for removalsLeft > 0 {
		digitStack = digitStack[:len(digitStack)-1] // @step:pop
		removalsLeft-- // @step:complete
	}

	// Strip leading zeros and return; default to "0" for an empty result
	result := strings.TrimLeft(string(digitStack), "0") // @step:complete
	if result == "" {
		return "0"
	}
	return result // @step:complete
}

func main() {
	fmt.Println(removeKDigits("1432219", 3))
}
