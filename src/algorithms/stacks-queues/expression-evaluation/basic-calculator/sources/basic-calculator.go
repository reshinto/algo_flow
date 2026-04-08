// Basic Calculator — evaluate a simple expression string with +, -, (, ) using a stack for sign propagation
package main

import (
	"fmt"
	"strconv"
	"unicode"
)

func basicCalculator(expression string) int64 {
	signStack := []int64{} // @step:initialize
	runningTotal := int64(0) // @step:initialize
	currentSign := int64(1) // @step:initialize

	// Tokenize the expression
	runes := []rune(expression)
	tokens := []string{}
	charIdx := 0
	for charIdx < len(runes) {
		ch := runes[charIdx]
		if unicode.IsDigit(ch) {
			numStr := ""
			for charIdx < len(runes) && unicode.IsDigit(runes[charIdx]) {
				numStr += string(runes[charIdx])
				charIdx++
			}
			tokens = append(tokens, numStr)
		} else if ch == '+' || ch == '-' || ch == '(' || ch == ')' {
			tokens = append(tokens, string(ch))
			charIdx++
		} else {
			charIdx++
		}
	}

	for _, currentToken := range tokens { // @step:initialize
		// @step:visit
		if digitValue, err := strconv.ParseInt(currentToken, 10, 64); err == nil {
			runningTotal += currentSign * digitValue // @step:evaluate
		} else if currentToken == "+" {
			currentSign = 1 // @step:visit
		} else if currentToken == "-" {
			currentSign = -1 // @step:visit
		} else if currentToken == "(" {
			// Save current running total and sign, then reset for the sub-expression
			signStack = append(signStack, runningTotal) // @step:push
			signStack = append(signStack, currentSign) // @step:push
			runningTotal = 0 // @step:push
			currentSign = 1 // @step:push
		} else if currentToken == ")" {
			// Pop sign and previous total, merge sub-expression result into parent context
			poppedSign := signStack[len(signStack)-1] // @step:pop
			signStack = signStack[:len(signStack)-1] // @step:pop
			prevTotal := signStack[len(signStack)-1] // @step:pop
			signStack = signStack[:len(signStack)-1] // @step:pop
			runningTotal = prevTotal + poppedSign*runningTotal // @step:pop
		}
	}

	return runningTotal // @step:complete
}

func main() {
	fmt.Println(basicCalculator("1 + (2 - 3)"))
}
