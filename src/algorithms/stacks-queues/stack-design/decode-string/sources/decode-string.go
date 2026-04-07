// Decode String — use a stack to decode encoded strings like "3[a2[c]]" → "accaccacc"
package main

import (
	"fmt"
	"strings"
)

func decodeString(inputString string) string {
	countStack := []int{} // @step:initialize
	stringStack := []string{} // @step:initialize
	currentString := "" // @step:initialize
	currentCount := 0 // @step:initialize

	for _, currentChar := range inputString {
		// @step:visit
		if currentChar >= '0' && currentChar <= '9' {
			// Build up multi-digit multipliers
			currentCount = currentCount*10 + int(currentChar-'0') // @step:visit
		} else if currentChar == '[' {
			// Push current context onto stacks and reset for nested segment
			countStack = append(countStack, currentCount) // @step:push
			stringStack = append(stringStack, currentString) // @step:push
			currentCount = 0 // @step:push
			currentString = "" // @step:push
		} else if currentChar == ']' {
			// Pop context and expand the repeated segment
			repeatCount := countStack[len(countStack)-1] // @step:pop
			countStack = countStack[:len(countStack)-1] // @step:pop
			prevString := stringStack[len(stringStack)-1] // @step:pop
			stringStack = stringStack[:len(stringStack)-1] // @step:pop
			currentString = prevString + strings.Repeat(currentString, repeatCount) // @step:pop
		} else {
			// Regular character — append to current string accumulator
			currentString += string(currentChar) // @step:visit
		}
	}

	return currentString // @step:complete
}

func main() {
	fmt.Println(decodeString("3[a2[c]]"))
}
