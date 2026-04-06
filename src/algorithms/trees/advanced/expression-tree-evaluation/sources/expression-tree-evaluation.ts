// Expression Tree Evaluation — build expression tree from postfix, then evaluate

interface ExprNode {
  token: string;
  left: ExprNode | null;
  right: ExprNode | null;
}

function expressionTreeEvaluation(expression: string): number {
  const tokens = expression.trim().split(/\s+/); // @step:initialize
  const stack: ExprNode[] = []; // @step:initialize

  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      stack.push({ token, left: null, right: null }); // @step:build-node
    } else {
      const rightOperand = stack.pop()!; // @step:connect-child
      const leftOperand = stack.pop()!; // @step:connect-child
      stack.push({ token, left: leftOperand, right: rightOperand }); // @step:build-node
    }
  }

  const root = stack[0] ?? null;

  function evaluate(node: ExprNode | null): number {
    if (!node) return 0;
    if (!node.left && !node.right) return Number(node.token); // @step:visit

    const leftValue = evaluate(node.left); // @step:traverse-left
    const rightValue = evaluate(node.right); // @step:traverse-right

    switch (node.token) {
      case "+":
        return leftValue + rightValue; // @step:visit
      case "-":
        return leftValue - rightValue; // @step:visit
      case "*":
        return leftValue * rightValue; // @step:visit
      case "/":
        return Math.trunc(leftValue / rightValue); // @step:visit
      default:
        return 0;
    }
  }

  return evaluate(root); // @step:complete
}
