// Evaluate Reverse Polish Notation — push operands, pop two and compute on operators
package main

import (
	"fmt"
	"math"
	"strconv"
)

func evaluateReversePolish(tokens []string) int64 {
	operandStack := []int64{} // @step:initialize
	operators := map[string]bool{"+": true, "-": true, "*": true, "/": true} // @step:initialize
	for _, currentToken := range tokens {
		// @step:visit
		if operators[currentToken] {
			operandB := operandStack[len(operandStack)-1] // @step:evaluate
			operandStack = operandStack[:len(operandStack)-1] // @step:evaluate
			operandA := operandStack[len(operandStack)-1] // @step:evaluate
			operandStack = operandStack[:len(operandStack)-1] // @step:evaluate
			var result int64
			switch currentToken {
			case "+":
				result = operandA + operandB // @step:evaluate
			case "-":
				result = operandA - operandB // @step:evaluate
			case "*":
				result = operandA * operandB // @step:evaluate
			default:
				result = int64(math.Trunc(float64(operandA) / float64(operandB))) // @step:evaluate
			}
			operandStack = append(operandStack, result) // @step:push
		} else {
			parsed, _ := strconv.ParseInt(currentToken, 10, 64)
			operandStack = append(operandStack, parsed) // @step:push
		}
	}
	return operandStack[0] // @step:complete
}

func main() {
	tokens := []string{"2", "1", "+", "3", "*"}
	fmt.Println(evaluateReversePolish(tokens))
}
