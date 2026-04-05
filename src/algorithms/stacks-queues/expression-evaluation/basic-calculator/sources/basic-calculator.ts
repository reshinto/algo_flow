// Basic Calculator — evaluate a simple expression string with +, -, (, ) using a stack for sign propagation
function basicCalculator(expression: string): number {
  const signStack: number[] = []; // @step:initialize
  let runningTotal = 0; // @step:initialize
  let currentSign = 1; // @step:initialize

  const tokens = expression.match(/\d+|[+\-()]/g) ?? []; // @step:initialize

  for (let tokenIdx = 0; tokenIdx < tokens.length; tokenIdx++) {
    const currentToken = tokens[tokenIdx]!; // @step:visit

    if (/\d+/.test(currentToken)) {
      runningTotal += currentSign * parseInt(currentToken, 10); // @step:evaluate
    } else if (currentToken === "+") {
      currentSign = 1; // @step:visit
    } else if (currentToken === "-") {
      currentSign = -1; // @step:visit
    } else if (currentToken === "(") {
      // Save current running total and sign, then reset for the sub-expression
      signStack.push(runningTotal); // @step:push
      signStack.push(currentSign); // @step:push
      runningTotal = 0; // @step:push
      currentSign = 1; // @step:push
    } else if (currentToken === ")") {
      // Pop sign and previous total, merge sub-expression result into parent context
      const poppedSign = signStack.pop()!; // @step:pop
      const prevTotal = signStack.pop()!; // @step:pop
      runningTotal = prevTotal + poppedSign * runningTotal; // @step:pop
    }
  }

  return runningTotal; // @step:complete
}
