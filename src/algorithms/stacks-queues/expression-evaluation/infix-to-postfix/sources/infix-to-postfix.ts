// Infix to Postfix — Dijkstra's Shunting-Yard: convert infix expression to postfix (RPN)
function infixToPostfix(expression: string): string {
  const operatorPrecedence: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2 }; // @step:initialize
  const outputQueue: string[] = []; // @step:initialize
  const operatorStack: string[] = []; // @step:initialize

  // Tokenize: split on spaces, or split multi-char operands from single-char operators/parens
  const tokens = expression.match(/[A-Za-z0-9]+|[+\-*/()]/g) ?? []; // @step:initialize

  for (let tokenIdx = 0; tokenIdx < tokens.length; tokenIdx++) {
    const currentToken = tokens[tokenIdx]!; // @step:visit

    if (/^[A-Za-z0-9]+$/.test(currentToken)) {
      // Operand — send directly to output
      outputQueue.push(currentToken); // @step:output
    } else if (currentToken in operatorPrecedence) {
      // Operator — pop higher/equal-precedence operators to output first
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "(" &&
        (operatorPrecedence[operatorStack[operatorStack.length - 1]!] ?? 0) >=
          (operatorPrecedence[currentToken] ?? 0) // @step:compare
      ) {
        outputQueue.push(operatorStack.pop()!); // @step:pop
      }
      operatorStack.push(currentToken); // @step:push
    } else if (currentToken === "(") {
      operatorStack.push(currentToken); // @step:push
    } else if (currentToken === ")") {
      // Pop to output until matching '(' is found
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
        outputQueue.push(operatorStack.pop()!); // @step:pop
      }
      operatorStack.pop(); // @step:pop — discard the '('
    }
  }

  // Drain remaining operators to output
  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop()!); // @step:pop
  }

  return outputQueue.join(" "); // @step:complete
}
