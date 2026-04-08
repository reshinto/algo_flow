// Remove All Adjacent Duplicates — use a stack to repeatedly remove adjacent duplicate pairs
package main

import "fmt"

func removeAllAdjacentDuplicates(inputString string) string {
	stack := []rune{} // @step:initialize
	for _, ch := range inputString {
		// @step:visit
		var stackTop rune
		if len(stack) > 0 {
			stackTop = stack[len(stack)-1]
		} // @step:visit
		if len(stack) > 0 && stackTop == ch {
			stack = stack[:len(stack)-1] // @step:match
		} else {
			stack = append(stack, ch) // @step:push
		}
	}
	// Remaining stack characters form the result after all duplicate pairs removed
	return string(stack) // @step:complete
}

func main() {
	fmt.Println(removeAllAdjacentDuplicates("abbaca"))
}
