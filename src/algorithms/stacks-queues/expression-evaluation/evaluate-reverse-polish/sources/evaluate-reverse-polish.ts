// Evaluate Reverse Polish Notation — push operands, pop two and compute on operators
function evaluateReversePolish(tokens: string[]): number {
  const operandStack: number[] = []; // @step:initialize
  const operators = new Set(["+", "-", "*", "/"]); // @step:initialize
  for (let tokenIdx = 0; tokenIdx < tokens.length; tokenIdx++) {
    const currentToken = tokens[tokenIdx]!; // @step:visit
    if (operators.has(currentToken)) {
      const operandB = operandStack.pop()!; // @step:evaluate
      const operandA = operandStack.pop()!; // @step:evaluate
      let result: number;
      if (currentToken === "+")
        result = operandA + operandB; // @step:evaluate
      else if (currentToken === "-")
        result = operandA - operandB; // @step:evaluate
      else if (currentToken === "*")
        result = operandA * operandB; // @step:evaluate
      else result = Math.trunc(operandA / operandB); // @step:evaluate
      operandStack.push(result); // @step:push
    } else {
      operandStack.push(parseInt(currentToken, 10)); // @step:push
    }
  }
  return operandStack[0]!; // @step:complete
}
